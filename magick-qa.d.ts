/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from "lit";
import "./components/magick-qa-menu";
import "./components/magick-qa-threads";
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class MagickQA extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * The name to say "Hello" to.
     */
    name: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    isMenuOpen: boolean;
    isCardCreationActive: boolean;
    render(): import("lit-html").TemplateResult<1>;
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name: string): string;
    openMenu(): void;
    closeMenu(): void;
    toggleCardCreationMode(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "magick-qa": MagickQA;
    }
}
//# sourceMappingURL=magick-qa.d.ts.map