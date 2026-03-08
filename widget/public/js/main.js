import { WidgetManager } from './widget_manager.js';

const widgetManager = new WidgetManager(window.widgetConfiguration);
const modal = widgetManager.modal;

export const Widget = {
    reload: widgetManager.load.bind(widgetManager),
};
