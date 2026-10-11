# READ-ONLY feature-usage check for the Fitvario SEO feature flags.
#
# What it prints: aggregate counts only. No names, phone numbers, emails or ids are ever printed.
# What it does not do: write, update, delete, send a message or call any external service.
#
# HOW TO RUN (from the fitvario-backend folder, with the production environment loaded):
#
#     python manage.py shell < docs/seo/verify_features.py
#
# (Copy this file to the backend repo or give the full path to it.)
#
# RUN IT SAFELY
#   1. Best: point DB_USER / DB_PASSWORD (and DB_HOST) at a read-only role (GRANT SELECT only) or at a read
#      replica, then run it. A read-only role cannot change anything even if the script were wrong.
#   2. Otherwise the script protects itself: it opens one transaction and runs "SET TRANSACTION READ ONLY",
#      so PostgreSQL refuses any write inside it, and it only calls .count() and .aggregate().
#   3. Run it once, off peak. Each query is an indexed count or a group count; none loads rows.
#
# AFTER RUNNING: paste the whole output back. A flag is set to "live" only where real gyms show real use.
#
# NOTE ON "REAL USAGE": counts include every gym row, including demo, test and your own gyms. Read the
# numbers with that in mind; the gym counts below are DISTINCT gyms, so one busy gym is counted once.

from datetime import timedelta

from django.db import connection, transaction
from django.db.models import Count, Q
from django.utils import timezone

from auth_core.models import (
    Batch,
    DietPlanRequest,
    DietPlanTemplate,
    GymAccount,
    GymSubscription,
    MemberDietPlan,
    MemberWorkoutPlan,
    PlatformTemplate,
    PlatformTemplateAccess,
    WhitelabelConfig,
    WorkoutPlanRequest,
    WorkoutPlanTemplate,
)
from organizations.models import Gym

NOW = timezone.now()
SINCE_90 = NOW - timedelta(days=90)


def line(text=""):
    print(text)


def section(title, source):
    line()
    line("=" * 72)
    line(title)
    line("source: " + source)
    line("-" * 72)


with transaction.atomic():
    with connection.cursor() as cur:
        cur.execute("SET TRANSACTION READ ONLY")

    active_gyms = Gym.objects.filter(is_active=True).count()
    line("Fitvario feature usage check, run at " + NOW.strftime("%Y-%m-%d %H:%M UTC"))
    line("Active gyms (organizations.Gym, is_active=True): %d" % active_gyms)

    # ---- 1. Workout and diet plans -------------------------------------------------------------------------
    section(
        "1. WORKOUT PLANS AND DIET PLANS (flags: workout_diet_plans, workout_plans, diet_plans)",
        "auth_core.MemberWorkoutPlan, auth_core.MemberDietPlan (plan assigned to a member), "
        "WorkoutPlanTemplate, DietPlanTemplate (plans a gym built), WorkoutPlanRequest, DietPlanRequest",
    )
    workout_gyms = (
        MemberWorkoutPlan.objects.values("member__gym_id").distinct().count()
    )
    diet_gyms = MemberDietPlan.objects.values("member__gym_id").distinct().count()
    workout_gyms_90 = (
        MemberWorkoutPlan.objects.filter(created_at__gte=SINCE_90).values("member__gym_id").distinct().count()
    )
    diet_gyms_90 = (
        MemberDietPlan.objects.filter(created_at__gte=SINCE_90).values("member__gym_id").distinct().count()
    )
    both_gyms = set(MemberWorkoutPlan.objects.values_list("member__gym_id", flat=True).distinct()) & set(
        MemberDietPlan.objects.values_list("member__gym_id", flat=True).distinct()
    )
    line("Gyms with at least one workout plan assigned to a member (ever):      %d" % workout_gyms)
    line("Gyms with at least one diet plan assigned to a member (ever):         %d" % diet_gyms)
    line("Gyms with BOTH (ever):                                                %d" % len(both_gyms))
    line("Gyms that assigned a workout plan in the last 90 days:                %d" % workout_gyms_90)
    line("Gyms that assigned a diet plan in the last 90 days:                   %d" % diet_gyms_90)
    line("Member workout plan assignments, total / active / completed:          %d / %d / %d" % (
        MemberWorkoutPlan.objects.count(),
        MemberWorkoutPlan.objects.filter(is_active=True).count(),
        MemberWorkoutPlan.objects.filter(is_completed=True).count(),
    ))
    line("Member diet plan assignments, total / active / completed:             %d / %d / %d" % (
        MemberDietPlan.objects.count(),
        MemberDietPlan.objects.filter(is_active=True).count(),
        MemberDietPlan.objects.filter(is_completed=True).count(),
    ))
    line("Gyms that built at least one workout template / diet template:        %d / %d" % (
        WorkoutPlanTemplate.objects.values("gym_id").distinct().count(),
        DietPlanTemplate.objects.values("gym_id").distinct().count(),
    ))
    line("Plan requests from members, workout / diet (all time):                %d / %d" % (
        WorkoutPlanRequest.objects.count(), DietPlanRequest.objects.count(),
    ))

    # ---- 2. Template marketplace ---------------------------------------------------------------------------
    section(
        "2. TEMPLATE MARKETPLACE (flag: template_marketplace)",
        "auth_core.PlatformTemplate (templates on offer), auth_core.PlatformTemplateAccess "
        "(a gym owner claimed, bought or was assigned one)",
    )
    line("Templates on the marketplace (all):                                   %d" % PlatformTemplate.objects.count())
    by_type = PlatformTemplateAccess.objects.values("access_type", "payment_status").annotate(n=Count("id"))
    if not by_type:
        line("Access records:                                                       0")
    for row in sorted(by_type, key=lambda r: (r["access_type"], r["payment_status"])):
        line("Access records, access_type=%-9s payment_status=%-8s:       %d" % (
            row["access_type"], row["payment_status"], row["n"]))
    line("Distinct gym owners with any access record:                           %d" % (
        PlatformTemplateAccess.objects.values("gym_owner_id").distinct().count()))
    line("Distinct owners who BOUGHT (access_type=purchased, paid):             %d" % (
        PlatformTemplateAccess.objects.filter(access_type="purchased", payment_status="paid")
        .values("gym_owner_id").distinct().count()))
    line("Distinct owners who CLAIMED free, last 90 days:                       %d" % (
        PlatformTemplateAccess.objects.filter(access_type="free", created_at__gte=SINCE_90)
        .values("gym_owner_id").distinct().count()))
    line("Note: 'assigned' records are given by Fitvario staff, not self-service usage.")

    # ---- 3. Batches ----------------------------------------------------------------------------------------
    section(
        "3. BATCHES / TIME SLOTS (flag: batches_time_slots)",
        "auth_core.Batch (is_active=True), auth_core.GymAccount.batch (member assigned to a batch)",
    )
    per_gym = list(
        Batch.objects.filter(is_active=True).values("gym_id").annotate(n=Count("id")).values_list("n", flat=True)
    )
    buckets = {"1": 0, "2": 0, "3-5": 0, "6+": 0}
    for n in per_gym:
        buckets["1" if n == 1 else "2" if n == 2 else "3-5" if n <= 5 else "6+"] += 1
    line("Active batches in total:                                              %d" % sum(per_gym))
    line("Gyms with at least one active batch:                                  %d of %d active gyms" % (
        len(per_gym), active_gyms))
    line("Gyms by number of active batches:  1: %d   2: %d   3-5: %d   6+: %d" % (
        buckets["1"], buckets["2"], buckets["3-5"], buckets["6+"]))
    assigned = GymAccount.objects.filter(is_active=True, batch__isnull=False)
    line("Active members assigned to a batch:                                   %d" % assigned.count())
    line("Gyms where at least one active member is assigned to a batch:         %d" % (
        assigned.values("gym_id").distinct().count()))

    # ---- 4. White-label / branding -------------------------------------------------------------------------
    section(
        "4. WHITE-LABEL BRANDING (flag: white_label)",
        "auth_core.WhitelabelConfig (one row per gym owner; a row is also created empty when an owner just "
        "opens the screen, so rows alone mean nothing)",
    )
    configured = WhitelabelConfig.objects.exclude(app_name="").exclude(logo_url="")
    line("Owners who opened the branding screen (any row):                      %d" % WhitelabelConfig.objects.count())
    line("Owners with BOTH an app name and a logo saved:                        %d" % configured.count())
    line("...of which the master switch is ON (branding is live):               %d" % (
        configured.filter(is_enabled=True).count()))
    line("...of which changed in the last 90 days:                              %d" % (
        configured.filter(updated_at__gte=SINCE_90).count()))

    # ---- 5. Self-serve subscriptions -----------------------------------------------------------------------
    section(
        "5. SELF-SERVE SUBSCRIPTIONS WITH A RAZORPAY PAYMENT (flag: self_serve_signup_subscription)",
        "auth_core.GymSubscription: payment_status='paid' and a non-empty razorpay_payment_id. "
        "Subscriptions a Fitvario admin created by hand have no Razorpay payment id, so they are excluded.",
    )
    paid = GymSubscription.objects.filter(payment_status="paid").exclude(razorpay_payment_id="")
    line("Paid Razorpay subscriptions, all time:                                %d" % paid.count())
    line("Paid Razorpay subscriptions, last 90 days:                            %d" % (
        paid.filter(created_at__gte=SINCE_90).count()))
    line("Distinct owners with a paid Razorpay subscription, last 90 days:      %d" % (
        paid.filter(created_at__gte=SINCE_90).values("gym_owner_id").distinct().count()))
    line("Of those 90-day payments, used a coupon:                              %d" % (
        paid.filter(created_at__gte=SINCE_90, coupon__isnull=False).count()))
    line("Subscriptions with status paid but NO Razorpay id (admin-created):    %d" % (
        GymSubscription.objects.filter(payment_status="paid", razorpay_payment_id="").count()))
    line("Note: this shows owners paying through Razorpay. It does not show that the owner signed up")
    line("alone; a sales-assisted owner can also pay the Razorpay link. Use it as a floor, not proof.")

    line()
    line("Done. Nothing was written. Paste this output back to set the flags.")
