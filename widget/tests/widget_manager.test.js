import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Modal } from '../public/js/modal.js';
import { WidgetManager } from '../public/js/widget_manager.js';

describe('WidgetManager', () => {
    beforeEach(() => {
        Modal.instance = undefined;
        document.body.innerHTML = '';
        document.head.innerHTML = '';
    });

    afterEach(() => {
        Modal.instance = undefined;
    });

    it('renders a button inside shadow DOM of .widget-trigger elements', () => {
        document.body.innerHTML = '<div class="widget-trigger"></div>';

        new WidgetManager({ baseAssetsUrl: 'http://assets.test', widgetUrl: 'http://widget.test' });

        const container = document.querySelector('.widget-trigger');
        const shadow = container.shadowRoot;
        expect(shadow).not.toBeNull();

        const btn = shadow.querySelector('.widget-open-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toBe('Open Widget');
    });

    it('injects widget CSS into shadow DOM', () => {
        document.body.innerHTML = '<div class="widget-trigger"></div>';

        new WidgetManager({ baseAssetsUrl: 'http://assets.test', widgetUrl: 'http://widget.test' });

        const shadow = document.querySelector('.widget-trigger').shadowRoot;
        const link = shadow.querySelector('link[rel="stylesheet"]');
        expect(link.href).toBe('http://assets.test/css/widget.css');
    });

    it('renders into multiple .widget-trigger containers', () => {
        document.body.innerHTML = `
            <div class="widget-trigger"></div>
            <div class="widget-trigger"></div>
        `;

        new WidgetManager({ baseAssetsUrl: 'http://assets.test', widgetUrl: 'http://widget.test' });

        const containers = document.querySelectorAll('.widget-trigger');
        containers.forEach(container => {
            expect(container.shadowRoot.querySelector('.widget-open-btn')).not.toBeNull();
        });
    });

    it('button click opens the modal', () => {
        document.body.innerHTML = '<div class="widget-trigger"></div>';

        new WidgetManager({ baseAssetsUrl: 'http://assets.test', widgetUrl: 'http://widget.test' });

        const btn = document.querySelector('.widget-trigger').shadowRoot.querySelector('.widget-open-btn');
        btn.click();

        expect(document.getElementById('widget-modal')).not.toBeNull();
    });

    it('reload re-renders the widget', () => {
        document.body.innerHTML = '<div class="widget-trigger"></div>';

        const manager = new WidgetManager({ baseAssetsUrl: 'http://assets.test', widgetUrl: 'http://widget.test' });

        // Add a second container after initial load
        const extra = document.createElement('div');
        extra.className = 'widget-trigger';
        document.body.appendChild(extra);

        manager.load();

        expect(extra.shadowRoot.querySelector('.widget-open-btn')).not.toBeNull();
    });

    it('handles missing config gracefully', () => {
        document.body.innerHTML = '<div class="widget-trigger"></div>';

        const manager = new WidgetManager({});

        const shadow = document.querySelector('.widget-trigger').shadowRoot;
        expect(shadow.querySelector('.widget-open-btn')).not.toBeNull();
    });
});
