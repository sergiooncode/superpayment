import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Modal } from '../public/js/modal.js';

describe('Modal', () => {
    beforeEach(() => {
        Modal.instance = undefined;
        document.body.innerHTML = '';
        document.head.innerHTML = '';
    });

    afterEach(() => {
        Modal.instance = undefined;
    });

    it('is a singleton', () => {
        const a = new Modal('http://localhost:3001');
        const b = new Modal('http://localhost:3001');
        expect(a).toBe(b);
    });

    it('open() creates the modal with iframe', () => {
        const modal = new Modal('http://widget.test');
        modal.open();

        const el = document.getElementById('widget-modal');
        expect(el).not.toBeNull();
        expect(el.tagName).toBe('ASIDE');

        const iframe = document.getElementById('widget-iframe');
        expect(iframe.src).toBe('http://widget.test/widget.html');
    });

    it('open() adds overlay with click-to-close', () => {
        const modal = new Modal('http://widget.test');
        modal.open();

        const overlay = document.querySelector('.widget-modal-overlay');
        expect(overlay).not.toBeNull();

        overlay.click();
        expect(document.getElementById('widget-modal')).toBeNull();
    });

    it('open() replaces existing modal if already open', () => {
        const modal = new Modal('http://widget.test');
        modal.open();
        modal.open();

        const modals = document.querySelectorAll('#widget-modal');
        expect(modals.length).toBe(1);
    });

    it('open() injects modal CSS link once', () => {
        const modal = new Modal('http://widget.test');
        modal.open();
        modal.open();

        const links = document.querySelectorAll('#widget-modal-css');
        expect(links.length).toBe(1);
        expect(links[0].href).toBe('http://widget.test/css/modal.css');
    });

    it('close() removes the modal from DOM', () => {
        const modal = new Modal('http://widget.test');
        modal.open();
        modal.close();

        expect(document.getElementById('widget-modal')).toBeNull();
    });

    it('close() is safe to call when no modal exists', () => {
        const modal = new Modal('http://widget.test');
        expect(() => modal.close()).not.toThrow();
    });

    it('messageHandler ignores events from wrong origin', () => {
        const modal = new Modal('http://widget.test');
        modal.open();

        const closeSpy = vi.spyOn(modal, 'close');
        modal.messageHandler({ origin: 'http://evil.test', data: 'voucher-submitted' });

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('messageHandler closes modal and dispatches event on voucher-submitted', () => {
        const modal = new Modal('http://widget.test');
        modal.open();

        const handler = vi.fn();
        window.addEventListener('widget-voucher-submitted', handler);

        modal.messageHandler({ origin: 'http://widget.test', data: 'voucher-submitted' });

        expect(document.getElementById('widget-modal')).toBeNull();
        expect(handler).toHaveBeenCalled();

        window.removeEventListener('widget-voucher-submitted', handler);
    });

    it('messageHandler closes modal on widget-close', () => {
        const modal = new Modal('http://widget.test');
        modal.open();

        modal.messageHandler({ origin: 'http://widget.test', data: 'widget-close' });

        expect(document.getElementById('widget-modal')).toBeNull();
    });
});
