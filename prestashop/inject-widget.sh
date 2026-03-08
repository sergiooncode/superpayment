#!/bin/bash
# Injects the Ealyx widget into PrestaShop's theme.
# Usage: docker compose exec prestashop bash /tmp/inject-widget.sh

set -euo pipefail

MARKER="<!-- ealyx-widget -->"
HEAD_FILE="/var/www/html/themes/classic/templates/_partials/head.tpl"
CART_FILE="/var/www/html/themes/classic/templates/checkout/cart.tpl"

# Inject widget script into head (loads on all pages)
if grep -q "$MARKER" "$HEAD_FILE" 2>/dev/null; then
  echo "Widget script already injected in head."
else
  cat >> "$HEAD_FILE" <<'SNIPPET'

<!-- ealyx-widget -->
<script>
  var widgetConfiguration = {
    baseAssetsUrl: "http://localhost:3001",
    widgetUrl: "http://localhost:3001",
  };

  document.addEventListener("DOMContentLoaded", function () {
    var script = document.createElement("script");
    script.type = "module";
    script.appendChild(document.createTextNode(
      'import { Widget } from "' + widgetConfiguration.baseAssetsUrl + '/js/main.js"; window.Widget = Widget;'
    ));
    document.head.appendChild(script);
  });
</script>
<!-- /ealyx-widget -->
SNIPPET
  echo "Widget script injected into $HEAD_FILE"
fi

# Inject widget trigger div into cart summary, before the checkout actions block
if grep -q "$MARKER" "$CART_FILE" 2>/dev/null; then
  echo "Widget trigger already injected in cart."
else
  sed -i '/{block name='\''cart_actions'\''}/i \
<!-- ealyx-widget -->\
<div class="widget-trigger" data-type="button" style="margin: 20px 0; padding: 0 20px;"></div>\
<!-- /ealyx-widget -->' "$CART_FILE"
  echo "Widget trigger injected into $CART_FILE"
fi
