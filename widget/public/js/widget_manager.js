import { Modal } from './modal.js';

export class WidgetManager {
    constructor(config) {
        this.baseAssetsUrl = (config?.baseAssetsUrl || '').replace(/\/$/, '');
        this.widgetUrl = (config?.widgetUrl || '').replace(/\/$/, '');
        this.modal = new Modal(this.widgetUrl);
        this.load();
    }

    load() {
        const containers = document.querySelectorAll('.widget-trigger');
        containers.forEach(container => {
            const shadow = container.shadowRoot || container.attachShadow({ mode: 'open' });
            shadow.innerHTML = '';
            shadow.appendChild(this.getStyleElement());
            shadow.appendChild(this.getButtonElement());
        });
    }

    getStyleElement() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${this.baseAssetsUrl}/css/widget.css`;
        return link;
    }

    getButtonElement() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<button class="widget-open-btn" type="button">Open Widget</button>`;
        const btn = wrapper.querySelector('button');
        btn.addEventListener('click', this.modal.open.bind(this.modal));
        return wrapper;
    }
}
