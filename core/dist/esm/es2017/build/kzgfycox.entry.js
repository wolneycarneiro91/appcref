import { h } from '../ionic.core.js';

import { a as BACKDROP, b as isCancel, c as present, d as dismiss, e as eventMethod, f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-63a1953b.js';
import { a as getClassMap } from './chunk-7c632336.js';

function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.4);
    wrapperAnimation.fromTo('translateY', '100%', '0%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.4, 0);
    wrapperAnimation.fromTo('translateY', '0%', '100%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(450)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('translateY', '100%', '0%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.action-sheet-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('translateY', '0%', '100%');
    const ani = baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(450)
        .add(backdropAnimation)
        .add(wrapperAnimation);
    return Promise.resolve(ani);
}

class ActionSheet {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.backdropDismiss = true;
        this.translucent = false;
        this.animated = true;
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    dispatchCancelHandler(ev) {
        const role = ev.detail.role;
        if (isCancel(role)) {
            const cancelButton = this.getButtons().find(b => b.role === 'cancel');
            this.callButtonHandler(cancelButton);
        }
    }
    present() {
        return present(this, 'actionSheetEnter', iosEnterAnimation, mdEnterAnimation);
    }
    dismiss(data, role) {
        return dismiss(this, data, role, 'actionSheetLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    onDidDismiss() {
        return eventMethod(this.el, 'ionActionSheetDidDismiss');
    }
    onWillDismiss() {
        return eventMethod(this.el, 'ionActionSheetWillDismiss');
    }
    async buttonClick(button) {
        const role = button.role;
        if (isCancel(role)) {
            return this.dismiss(undefined, role);
        }
        const shouldDismiss = await this.callButtonHandler(button);
        if (shouldDismiss) {
            return this.dismiss(undefined, button.role);
        }
        return Promise.resolve();
    }
    async callButtonHandler(button) {
        if (button && button.handler) {
            try {
                const rtn = await button.handler();
                if (rtn === false) {
                    return false;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
        return true;
    }
    getButtons() {
        return this.buttons.map(b => {
            return (typeof b === 'string')
                ? { text: b }
                : b;
        });
    }
    hostData() {
        return {
            style: {
                zIndex: 20000 + this.overlayIndex,
            },
            class: Object.assign({}, getClassMap(this.cssClass), { 'action-sheet-translucent': this.translucent })
        };
    }
    render() {
        const allButtons = this.getButtons();
        const cancelButton = allButtons.find(b => b.role === 'cancel');
        const buttons = allButtons.filter(b => b.role !== 'cancel');
        return [
            h("ion-backdrop", { tappable: this.backdropDismiss }),
            h("div", { class: "action-sheet-wrapper", role: "dialog" },
                h("div", { class: "action-sheet-container" },
                    h("div", { class: "action-sheet-group" },
                        this.header !== undefined &&
                            h("div", { class: "action-sheet-title" },
                                this.header,
                                this.subHeader && h("div", { class: "action-sheet-sub-title" }, this.subHeader)),
                        buttons.map(b => h("button", { type: "button", "ion-activatable": true, class: buttonClass(b), onClick: () => this.buttonClick(b) },
                            h("span", { class: "action-sheet-button-inner" },
                                b.icon && h("ion-icon", { icon: b.icon, lazy: false, class: "action-sheet-icon" }),
                                b.text),
                            this.mode === 'md' && h("ion-ripple-effect", null)))),
                    cancelButton &&
                        h("div", { class: "action-sheet-group action-sheet-group-cancel" },
                            h("button", { type: "button", class: buttonClass(cancelButton), onClick: () => this.buttonClick(cancelButton) },
                                h("span", { class: "action-sheet-button-inner" },
                                    cancelButton.icon &&
                                        h("ion-icon", { icon: cancelButton.icon, lazy: false, class: "action-sheet-icon" }),
                                    cancelButton.text)))))
        ];
    }
    static get is() { return "ion-action-sheet"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "backdropDismiss": {
            "type": Boolean,
            "attr": "backdrop-dismiss"
        },
        "buttons": {
            "type": "Any",
            "attr": "buttons"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayIndex": {
            "type": Number,
            "attr": "overlay-index"
        },
        "present": {
            "method": true
        },
        "subHeader": {
            "type": String,
            "attr": "sub-header"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionActionSheetDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionActionSheetDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionActionSheetWillDismiss",
            "method": "dispatchCancelHandler"
        }]; }
    static get style() { return ".sc-ion-action-sheet-ios-h{--color:initial;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--height:100%;--max-height:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:block;position:fixed;font-family:var(--ion-font-family,inherit);-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-action-sheet-ios-h{display:none}.action-sheet-wrapper.sc-ion-action-sheet-ios{left:0;right:0;bottom:0;margin:auto;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);display:block;position:absolute;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);z-index:10;pointer-events:none}.action-sheet-button.sc-ion-action-sheet-ios{width:100%;border:0;outline:none;font-family:inherit}.action-sheet-button.activated.sc-ion-action-sheet-ios{background:var(--background-activated)}.action-sheet-button-inner.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.action-sheet-container.sc-ion-action-sheet-ios{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;-ms-flex-pack:end;justify-content:flex-end;height:100%;max-height:100%}.action-sheet-group.sc-ion-action-sheet-ios{-ms-flex-negative:2;flex-shrink:2;overscroll-behavior-y:contain;overflow-y:scroll;-webkit-overflow-scrolling:touch;pointer-events:all;background:var(--background)}.action-sheet-group.sc-ion-action-sheet-ios::-webkit-scrollbar{display:none}.action-sheet-group-cancel.sc-ion-action-sheet-ios{-ms-flex-negative:0;flex-shrink:0;overflow:hidden}.action-sheet-selected.sc-ion-action-sheet-ios{background:var(--background-selected)}.sc-ion-action-sheet-ios-h{--background:var(--ion-overlay-background-color,var(--ion-color-step-150,#f9f9f9));--background-selected:var(--background,var(--ion-background-color,#fff));--background-activated:rgba(var(--ion-text-color-rgb,0,0,0),0.1);text-align:center}.action-sheet-wrapper.sc-ion-action-sheet-ios{margin:var(--ion-safe-area-top,0) auto var(--ion-safe-area-bottom,0)}.action-sheet-container.sc-ion-action-sheet-ios{padding:0 10px}.action-sheet-group.sc-ion-action-sheet-ios{border-radius:13px;margin-bottom:8px}.action-sheet-group.sc-ion-action-sheet-ios:first-child{margin-top:10px}.action-sheet-group.sc-ion-action-sheet-ios:last-child{margin-bottom:10px}.action-sheet-translucent.sc-ion-action-sheet-ios-h   .action-sheet-group.sc-ion-action-sheet-ios{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.action-sheet-title.sc-ion-action-sheet-ios{padding:14px 14px 13px;border-bottom:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2);color:var(--color,var(--ion-color-step-400,#999));font-size:13px;font-weight:400;text-align:center}.action-sheet-sub-title.sc-ion-action-sheet-ios{padding:15px 0 0;font-size:12px}.action-sheet-button.sc-ion-action-sheet-ios{margin:0;padding:18px;height:56px;border-bottom:.55px solid rgba(var(--ion-text-color-rgb,0,0,0),.2);background:transparent;color:var(--color,var(--ion-color-primary,#3880ff));font-size:20px;contain:strict}.action-sheet-button.sc-ion-action-sheet-ios   .action-sheet-icon.sc-ion-action-sheet-ios{margin-right:.1em;font-size:28px}.action-sheet-button.sc-ion-action-sheet-ios:last-child{border-bottom-color:transparent}.action-sheet-button.activated.sc-ion-action-sheet-ios{margin-top:-.55px;border-top:.55px solid var(--background-activated);border-bottom-color:var(--background-activated)}.action-sheet-selected.sc-ion-action-sheet-ios{font-weight:700}.action-sheet-destructive.sc-ion-action-sheet-ios{color:var(--ion-color-danger,#f04141)}.action-sheet-cancel.sc-ion-action-sheet-ios{background:var(--background-selected);font-weight:600}"; }
    static get styleMode() { return "ios"; }
}
function buttonClass(button) {
    return Object.assign({ 'action-sheet-button': true, 'ion-activatable': true, [`action-sheet-${button.role}`]: button.role !== undefined }, getClassMap(button.cssClass));
}

class ActionSheetController {
    create(opts) {
        return createOverlay(this.doc.createElement('ion-action-sheet'), opts);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, 'ion-action-sheet', id);
    }
    async getTop() {
        return getOverlay(this.doc, 'ion-action-sheet');
    }
    static get is() { return "ion-action-sheet-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}

export { ActionSheet as IonActionSheet, ActionSheetController as IonActionSheetController };
