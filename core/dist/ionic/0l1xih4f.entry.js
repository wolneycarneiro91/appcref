const t=window.Ionic.h;import{d as e,b as a,c as i}from"./chunk-7c632336.js";class s{constructor(){this.edge=!1,this.activated=!1}activatedChanged(){const t=this.activated,e=this.el.querySelector("ion-fab-button");e&&(e.activated=t),Array.from(this.el.querySelectorAll("ion-fab-list")).forEach(e=>{e.activated=t})}componentDidLoad(){this.activated&&this.activatedChanged()}onClick(){this.el.querySelector("ion-fab-list")&&(this.activated=!this.activated)}close(){this.activated=!1}hostData(){return{class:{[`fab-horizontal-${this.horizontal}`]:void 0!==this.horizontal,[`fab-vertical-${this.vertical}`]:void 0!==this.vertical,"fab-edge":this.edge}}}render(){return t("slot",null)}static get is(){return"ion-fab"}static get encapsulation(){return"shadow"}static get properties(){return{activated:{type:Boolean,attr:"activated",mutable:!0,watchCallbacks:["activatedChanged"]},close:{method:!0},edge:{type:Boolean,attr:"edge"},el:{elementRef:!0},horizontal:{type:String,attr:"horizontal"},vertical:{type:String,attr:"vertical"}}}static get listeners(){return[{name:"click",method:"onClick"}]}static get style(){return":host{position:absolute;z-index:999}:host(.fab-horizontal-center){left:50%;margin-left:-28px}:host(.fab-horizontal-start){left:calc(10px + var(--ion-safe-area-left, 0px))}:host(.fab-horizontal-end){right:calc(10px + var(--ion-safe-area-right, 0px))}:host(.fab-vertical-top){top:10px}:host(.fab-vertical-top.fab-edge){top:-28px}:host(.fab-vertical-bottom){bottom:10px}:host(.fab-vertical-bottom.fab-edge){bottom:-28px}:host(.fab-vertical-center){margin-top:-28px;top:50%}"}}class o{constructor(){this.keyFocus=!1,this.activated=!1,this.disabled=!1,this.routerDirection="forward",this.show=!1,this.translucent=!1,this.type="button",this.onFocus=(()=>{this.ionFocus.emit()}),this.onKeyUp=(()=>{this.keyFocus=!0}),this.onBlur=(()=>{this.keyFocus=!1,this.ionBlur.emit()})}hostData(){const{el:t,disabled:i,color:s,activated:o,show:n,translucent:r,size:c,keyFocus:l}=this,h=e("ion-fab-list",t);return{"aria-disabled":i?"true":null,class:Object.assign({},a(s),{"fab-button-in-list":h,"fab-button-translucent-in-list":h&&r,"fab-button-close-active":o,"fab-button-show":n,"fab-button-disabled":i,"fab-button-translucent":r,"ion-activatable":!0,focused:l,[`fab-button-${c}`]:void 0!==c})}}render(){const e=void 0===this.href?"button":"a";return t(e,Object.assign({},"button"===e?{type:this.type}:{href:this.href},{class:"button-native",disabled:this.disabled,onFocus:this.onFocus,onKeyUp:this.onKeyUp,onBlur:this.onBlur,onClick:t=>i(this.win,this.href,t,this.routerDirection)}),t("span",{class:"close-icon"},t("ion-icon",{name:"close",lazy:!1})),t("span",{class:"button-inner"},t("slot",null)),"md"===this.mode&&t("ion-ripple-effect",null))}static get is(){return"ion-fab-button"}static get encapsulation(){return"shadow"}static get properties(){return{activated:{type:Boolean,attr:"activated"},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled"},el:{elementRef:!0},href:{type:String,attr:"href"},keyFocus:{state:!0},mode:{type:String,attr:"mode"},routerDirection:{type:String,attr:"router-direction"},show:{type:Boolean,attr:"show"},size:{type:String,attr:"size"},translucent:{type:Boolean,attr:"translucent"},type:{type:String,attr:"type"},win:{context:"window"}}}static get events(){return[{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return":host{--transition:background-color,opacity 100ms linear;--ripple-color:currentColor;--border-radius:50%;--border-width:0;--border-style:none;--border-color:initial;margin:0;display:block;width:56px;height:56px;font-size:14px;text-align:center;text-overflow:ellipsis;text-transform:none;white-space:nowrap;-webkit-font-kerning:none;font-kerning:none}:host(.ion-color) .button-native{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.ion-color.activated) .button-native,:host(.ion-color.focused) .button-native{background:var(--ion-color-shade);color:var(--ion-color-contrast)}.button-native{border-radius:var(--border-radius);padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;-webkit-transform:var(--transform);transform:var(--transform);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:none;background:var(--background);background-clip:padding-box;color:var(--color);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:strict;cursor:pointer;overflow:hidden;z-index:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-box-sizing:border-box;box-sizing:border-box}.button-native[disabled]{cursor:default;opacity:.5;pointer-events:none}.button-inner{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}:host(.activated) .button-native{background:var(--background-activated);color:var(--color-activated)}:host(.focused) .button-native{background:var(--background-focused);color:var(--color-focused)}:host(.fab-button-disabled){pointer-events:none}::slotted(ion-icon){line-height:1}:host(.fab-button-small){margin:8px;width:40px;height:40px}.close-icon{left:0;right:0;top:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-transform:scale(.4) rotate(-45deg);transform:scale(.4) rotate(-45deg);-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;opacity:0}:host(.fab-button-close-active) .close-icon{-webkit-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg);opacity:1}:host(.fab-button-close-active) .button-inner{-webkit-transform:scale(.4) rotate(45deg);transform:scale(.4) rotate(45deg);opacity:0}ion-ripple-effect{color:var(--ripple-color)}:host{--background:var(--ion-color-primary,#3880ff);--background-activated:var(--background);--background-focused:var(--background-activated);--color:var(--ion-color-primary-contrast,#fff);--color-activated:var(--ion-color-primary-contrast,#fff);--color-focused:var(--color-activated);--box-shadow:0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12);--transition:box-shadow 280ms cubic-bezier(0.4,0,0.2,1),background-color 280ms cubic-bezier(0.4,0,0.2,1),color 280ms cubic-bezier(0.4,0,0.2,1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0,0,0.2,1) 0ms}:host(.activated){--box-shadow:0 7px 8px -4px rgba(0,0,0,0.2),0 12px 17px 2px rgba(0,0,0,0.14),0 5px 22px 4px rgba(0,0,0,0.12)}.close-icon,::slotted(ion-icon){font-size:24px}:host(.fab-button-in-list){--color:rgba(var(--ion-text-color-rgb,0,0,0),0.54);--color-activated:rgba(var(--ion-text-color-rgb,0,0,0),0.54);--color-focused:var(--color-activated);--background:var(--ion-color-light,#f4f5f8);--background-activated:var(--ion-color-light-shade,#d7d8da);--background-focused:var(--background-activated)}:host(.fab-button-in-list) ::slotted(ion-icon){font-size:18px}"}static get styleMode(){return"md"}}class n{constructor(){this.activated=!1,this.side="bottom"}activatedChanged(t){const e=Array.from(this.el.querySelectorAll("ion-fab-button")),a=t?30:0;e.forEach((e,i)=>{setTimeout(()=>e.show=t,i*a)})}hostData(){return{class:{"fab-list-active":this.activated,[`fab-list-side-${this.side}`]:!0}}}render(){return t("slot",null)}static get is(){return"ion-fab-list"}static get encapsulation(){return"shadow"}static get properties(){return{activated:{type:Boolean,attr:"activated",watchCallbacks:["activatedChanged"]},el:{elementRef:!0},side:{type:String,attr:"side"}}}static get style(){return":host{margin:66px 0;display:none;position:absolute;top:0;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;min-width:56px;min-height:56px}:host(.fab-list-active){display:-ms-flexbox;display:flex}::slotted(.fab-button-in-list){margin:8px 0;width:40px;height:40px;-webkit-transform:scale(0);transform:scale(0);opacity:0;visibility:hidden}:host(.fab-list-side-bottom) ::slotted(.fab-button-in-list),:host(.fab-list-side-top) ::slotted(.fab-button-in-list){margin:5px 0}:host(.fab-list-side-end) ::slotted(.fab-button-in-list),:host(.fab-list-side-start) ::slotted(.fab-button-in-list){margin:0 5px}::slotted(.fab-button-in-list.fab-button-show){-webkit-transform:scale(1);transform:scale(1);opacity:1;visibility:visible}:host(.fab-list-side-top){top:auto;bottom:0;-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.fab-list-side-start){margin:0 66px;right:0;-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.fab-list-side-end){margin:0 66px;left:0;-ms-flex-direction:row;flex-direction:row}"}}export{s as IonFab,o as IonFabButton,n as IonFabList};