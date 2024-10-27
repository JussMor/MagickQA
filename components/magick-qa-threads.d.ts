import { LitElement } from "lit";
export declare class MagickQAThreads extends LitElement {
    static styles: import("lit").CSSResult;
    cards: Array<{
        x: number;
        y: number;
        id: number;
        location: string;
        saved: boolean;
        content?: string;
    }>;
    isCardCreationMode: boolean;
    activeCard: number | null;
    canCreateCard: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    setCardCreationMode(isActive: boolean): void;
    handleClick(event: MouseEvent): void;
    handleSave(cardId: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "magick-qa-threads": MagickQAThreads;
    }
}
//# sourceMappingURL=magick-qa-threads.d.ts.map