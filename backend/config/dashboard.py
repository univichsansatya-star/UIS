from django.apps import apps
from django.contrib.auth import get_user_model
from django.contrib.admin.models import LogEntry
from django.db.models import Count

def dashboard_callback(request, context):
    app_counts = []
    total_records = 0
    for config in apps.get_app_configs():
        if config.name.startswith('django.') or config.name in {'rest_framework', 'corsheaders', 'solo', 'unfold'}:
            continue
        model_count = 0
        for model in config.get_models():
            try:
                model_count += model._default_manager.count()
            except Exception:
                continue
        if model_count:
            app_counts.append({
                'label': config.verbose_name.title(),
                'count': model_count,
            })
            total_records += model_count

    app_counts.sort(key=lambda item: item['count'], reverse=True)
    largest_count = app_counts[0]['count'] if app_counts else 0
    for item in app_counts:
        item['percentage'] = round(item['count'] * 100 / largest_count) if largest_count else 0
    recent_actions = list(
        LogEntry.objects.values('action_flag')
        .annotate(total=Count('id'))
        .order_by('action_flag')
    )
    action_counts = {str(item['action_flag']): item['total'] for item in recent_actions}
    active_admin_count = get_user_model().objects.filter(is_staff=True, is_active=True).count()

    context.update({
        "app_counts": app_counts,
        "total_records": total_records,
        "action_counts": action_counts,
        "total_actions": sum(action_counts.values()),
        "active_admin_count": active_admin_count,
        "total_apps": len(app_counts),
    })
    return context
