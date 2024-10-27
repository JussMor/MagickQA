/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { MagickQAThreads } from "./components/magick-qa-threads";
import "./components/magick-qa-menu";
import "./components/magick-qa-threads";

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("magick-qa")
export class MagickQA extends LitElement {
  static override styles = css`
    .magick-container {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      padding: 8px 8px;
      border-radius: 36px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
      z-index: 999999;
    }

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 3px;
    }

    .icon-container {
      display: flex;
    }

    svg {
      width: 1.5em;
      height: 1.5em;
      transition: transform 0.2s, background-color 0.2s;
      border-radius: 50%;
      padding: 4px;
      transform: scale(0.9);
    }

    svg:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1);
    }

    .tooltip {
      display: none;
      font-family: Helvetica;
      position: absolute;
      bottom: 153%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 8px 16px;
      border-radius: 5px;
      font-size: 0.8em;
      z-index: 1000;
      white-space: nowrap;
    }

    .tooltip::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }

    .icon-container:hover .one {
      left: 10%;
    }

    .icon-container:hover .two {
      left: 35%;
    }

    .icon-container:hover .three {
      left: 63%;
    }

    .icon-container:hover .four {
      left: 85%;
    }

    .icon-container:hover .tooltip {
      display: block;
    }

    .hidden-icon {
      max-width: 0;
      transition: max-width 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
      overflow: hidden;
      pointer-events: none;
    }

    section:hover .hidden-icon {
      max-width: 200px;
      opacity: 1;
      pointer-events: auto;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = "World";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  @state() isMenuOpen = false;

  @state() isCardCreationActive = false; // Track the state of card creation mode

  override render() {
    return html`
      <magick-qa-threads></magick-qa-threads>
      ${this.isMenuOpen
        ? html`<magick-qa-menu
            @close-menu="${this.closeMenu}"
          ></magick-qa-menu>`
        : ""}
      <section class="magick-container">
        <div class="icon-container" @click="${this.toggleCardCreationMode}">
          <!-- Change SVG based on the active state -->
          ${this.isCardCreationActive
            ? html`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="red"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
              `
            : html`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
              `}
          <div class="tooltip one">Comment: C</div>
        </div>

        <div class="icon-container" @click="${this.openMenu}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.269 0 .442-.173t.173-.442v-2.77h-3.577q-.557.95-1.46 1.476T12 17.616t-1.963-.525t-1.46-1.475H5v2.769q0 .269.173.442t.443.173M12 16.616q.95 0 1.725-.55t1.075-1.45H19v-9q0-.27-.173-.443T18.385 5H5.615q-.269 0-.442.173T5 5.616v9h4.2q.3.9 1.075 1.45t1.725.55M5.616 19H5h14z"
            />
          </svg>
          <div class="tooltip two">Inbox: I</div>
        </div>

        <div class="icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M16 15.5a3.496 3.496 0 0 0 3.464-3.868A3.496 3.496 0 0 0 16 8.5a3.496 3.496 0 0 0-3.464 3.868A3.496 3.496 0 0 0 16 15.5"
            />
            <path
              fill="white"
              fill-rule="evenodd"
              d="M15.926 18.75H8.074a6.75 6.75 0 0 1 0-13.5h7.852a6.75 6.75 0 0 1 0 13.5m0-1.5a5.25 5.25 0 1 0 0-10.5H8.074a5.25 5.25 0 0 0 0 10.5z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="tooltip three">Feature Flags: F</div>
        </div>

        <div class="icon-container hidden-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z"
            />
          </svg>
          <div class="tooltip four">Menu: M</div>
        </div>
      </section>
    `;
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }

  // Method to open the menu
  openMenu() {
    this.isMenuOpen = true;
  }

  // Method to close the menu
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Handle toggling of the card creation mode
  toggleCardCreationMode() {
    this.isCardCreationActive = !this.isCardCreationActive;
    const threads = this.shadowRoot?.querySelector(
      "magick-qa-threads"
    ) as MagickQAThreads;
    if (threads) {
      threads.setCardCreationMode(this.isCardCreationActive);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "magick-qa": MagickQA;
  }
}
