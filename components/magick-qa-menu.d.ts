import { LitElement } from "lit";
import "./magick-qa-menu-threads-card";
export declare class MagickQAMenu extends LitElement {
    alignment: string;
    isDragging: boolean;
    startX: number;
    dragDelta: number;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    disconnectedCallback(): void;
    closeMenu(): void;
    startDrag(event: MouseEvent | TouchEvent): void;
    doDrag: (event: MouseEvent | TouchEvent) => void;
    endDrag: () => void;
    enableTransition(): void;
    disableTransition(): void;
    snapToLeft(): void;
    snapToRight(): void;
    checkAlignment(): void;
    onResize: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        "magick-qa-menu": MagickQAMenu;
    }
}
//# sourceMappingURL=magick-qa-menu.d.ts.map