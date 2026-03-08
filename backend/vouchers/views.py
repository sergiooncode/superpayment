import json
import logging

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import Voucher

logger = logging.getLogger(__name__)


@require_http_methods(["POST"])
def create_voucher(request):
    logger.info("Received voucher creation request")

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        logger.warning("Invalid JSON in request body")
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    voucher_value = data.get("voucher", "").strip()
    code_value = data.get("code", "").strip()

    if not voucher_value or not code_value:
        logger.warning("Missing voucher or code: voucher=%s, code=%s", voucher_value, code_value)
        return JsonResponse({"error": "Both voucher and code are required"}, status=400)

    voucher = Voucher.objects.create(voucher=voucher_value, code=code_value)
    logger.info("Voucher created: id=%d, voucher=%s, code=%s", voucher.id, voucher.voucher, voucher.code)

    return JsonResponse({
        "id": voucher.id,
        "voucher": voucher.voucher,
        "code": voucher.code,
        "timestamp": voucher.timestamp.isoformat(),
    }, status=201)


