.PHONY: test test-widget test-backend up down build migrate createsuperuser collectstatic logs start prestashop inject-widget

start: build up migrate collectstatic

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

migrate:
	docker compose exec backend uv run python manage.py migrate

createsuperuser:
	docker compose exec backend uv run python manage.py createsuperuser

collectstatic:
	docker compose exec backend uv run python manage.py collectstatic --noinput

logs:
	docker compose logs -f backend

prestashop:
	docker compose --profile prestashop up -d prestashop-db prestashop widget
	@echo "Waiting for PrestaShop to install (this may take a few minutes on first run)..."
	@until docker compose exec prestashop test -f /var/www/html/themes/classic/templates/_partials/head.tpl 2>/dev/null; do sleep 5; done
	docker compose exec prestashop bash /tmp/inject-widget.sh
	@echo "PrestaShop ready at http://localhost:8080"
	@echo "Admin: http://localhost:8080/admin123 (admin@ealyx.local / Admin123!)"

inject-widget:
	docker compose --profile prestashop exec prestashop bash /tmp/inject-widget.sh

test: test-backend test-widget

test-backend:
	docker compose exec backend uv run --group dev pytest

test-widget:
	docker compose run --rm widget npm test
