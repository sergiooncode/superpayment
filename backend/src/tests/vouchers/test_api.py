import json

import pytest
from django.test import Client

from api.vouchers.models import Voucher


@pytest.fixture
def client():
    return Client()


@pytest.mark.django_db
class TestCreateVoucher:
    url = "/api/vouchers/"

    def test_create_voucher(self, client):
        response = client.post(
            self.url,
            data=json.dumps({"voucher": "SUMMER2026", "code": "ABC123"}),
            content_type="application/json",
        )
        assert response.status_code == 201
        data = response.json()
        assert data["voucher"] == "SUMMER2026"
        assert data["code"] == "ABC123"
        assert "id" in data
        assert "timestamp" in data
        assert Voucher.objects.count() == 1

    def test_missing_voucher(self, client):
        response = client.post(
            self.url,
            data=json.dumps({"code": "ABC123"}),
            content_type="application/json",
        )
        assert response.status_code == 400
        assert response.json()["error"] == "Both voucher and code are required"
        assert Voucher.objects.count() == 0

    def test_missing_code(self, client):
        response = client.post(
            self.url,
            data=json.dumps({"voucher": "SUMMER2026"}),
            content_type="application/json",
        )
        assert response.status_code == 400
        assert response.json()["error"] == "Both voucher and code are required"

    def test_empty_values(self, client):
        response = client.post(
            self.url,
            data=json.dumps({"voucher": "  ", "code": "  "}),
            content_type="application/json",
        )
        assert response.status_code == 400
        assert response.json()["error"] == "Both voucher and code are required"

    def test_invalid_json(self, client):
        response = client.post(
            self.url,
            data="not json",
            content_type="application/json",
        )
        assert response.status_code == 400
        assert response.json()["error"] == "Invalid JSON"

    def test_get_not_allowed(self, client):
        response = client.get(self.url)
        assert response.status_code == 405

    def test_put_not_allowed(self, client):
        response = client.put(
            self.url,
            data=json.dumps({"voucher": "X", "code": "Y"}),
            content_type="application/json",
        )
        assert response.status_code == 405
