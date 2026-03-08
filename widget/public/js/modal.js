export class Modal {
    constructor(widgetUrl) {
        if (Modal.instance) return Modal.instance;
        this.widgetUrl = widgetUrl;
        this.messageHandlerBound = this.messageHandler.bind(this);
        Modal.instance = this;
    }

    open() {
        if (document.getElementById('widget-modal')) {
            document.getElementById('widget-modal').remove();
        }
        const modal = document.createElement('aside');
        modal.id = 'widget-modal';
        modal.innerHTML = `
            <div class="widget-modal-overlay"></div>
            <iframe id="widget-iframe" src="${this.widgetUrl}/widget.html"></iframe>
        `;
        document.body.appendChild(modal);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${this.widgetUrl}/css/modal.css`;
        link.id = 'widget-modal-css';
        if (!document.getElementById('widget-modal-css')) {
            document.head.appendChild(link);
        }

        modal.querySelector('.widget-modal-overlay').addEventListener('click', this.close.bind(this));
        window.addEventListener('message', this.messageHandlerBound);
    }

    close() {
        document.getElementById('widget-modal')?.remove();
        window.removeEventListener('message', this.messageHandlerBound);
    }

    messageHandler(event) {
        if (event.origin !== this.widgetUrl) return;

        switch (event.data) {
            case 'voucher-submitted':
                this.close();
                window.dispatchEvent(new CustomEvent('widget-voucher-submitted'));
                break;
            case 'widget-close':
                this.close();
                break;
        }
    }
}
