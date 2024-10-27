import { LitElement } from "lit";
export declare class MagickQAMenuThreadsCard extends LitElement {
    static styles: import("lit").CSSResult;
    cards: Array<{
        x: number;
        y: number;
        id: number;
        location: string;
        saved: boolean;
        content?: string;
    }>;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    goToTicketPositon(xPosition: number, yPosition: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "magick-qa-menu-threads-card": MagickQAMenuThreadsCard;
    }
}
//# sourceMappingURL=magick-qa-menu-threads-card.d.ts.map