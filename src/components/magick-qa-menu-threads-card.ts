import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("magick-qa-menu-threads-card")
export class MagickQAMenuThreadsCard extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .checkPosition {
      padding: 8px 0px;
    }

    .checkPosition:hover {
      background-color: gray;
    }
  `;

  @state() cards: Array<{
    x: number;
    y: number;
    id: number;
    location: string;
    saved: boolean;
    content?: string;
  }> = [];

  override render() {
    return html`${this.cards.map(
      (card) => html`
        <div
          class="checkPosition"
          @mouseenter="${() => this.goToTicketPositon(card.x, card.y)}"
        >
          <span>${card.x}</span>
          <span>${card.y}</span>
        </div>
      `
    )}`;
  }

  // Use connectedCallback instead of firstUpdated for side effects
  override connectedCallback() {
    super.connectedCallback();
    const data = localStorage.getItem("cards") || "[]";
    const cardsFromLocalStorage = JSON.parse(data);

    // Avoid triggering update if cards haven't changed
    if (JSON.stringify(cardsFromLocalStorage) !== JSON.stringify(this.cards)) {
      this.cards = cardsFromLocalStorage;
    }
  }

  goToTicketPositon(xPosition: number, yPosition: number) {
    const centerX = xPosition - window.innerWidth / 2;
    const centerY = yPosition - window.innerHeight / 2;

    window.scrollTo({
      top: centerY,
      left: centerX,
      behavior: "smooth",
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "magick-qa-menu-threads-card": MagickQAMenuThreadsCard;
  }
}
