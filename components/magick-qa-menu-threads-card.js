var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
let MagickQAMenuThreadsCard = class MagickQAMenuThreadsCard extends LitElement {
    constructor() {
        super(...arguments);
        this.cards = [];
    }
    render() {
        return html `${this.cards.map((card) => html `
        <div
          class="checkPosition"
          @mouseenter="${() => this.goToTicketPositon(card.x, card.y)}"
        >
          <span>${card.x}</span>
          <span>${card.y}</span>
        </div>
      `)}`;
    }
    // Use connectedCallback instead of firstUpdated for side effects
    connectedCallback() {
        super.connectedCallback();
        const data = localStorage.getItem("cards") || "[]";
        const cardsFromLocalStorage = JSON.parse(data);
        // Avoid triggering update if cards haven't changed
        if (JSON.stringify(cardsFromLocalStorage) !== JSON.stringify(this.cards)) {
            this.cards = cardsFromLocalStorage;
        }
    }
    goToTicketPositon(xPosition, yPosition) {
        const centerX = xPosition - window.innerWidth / 2;
        const centerY = yPosition - window.innerHeight / 2;
        window.scrollTo({
            top: centerY,
            left: centerX,
            behavior: "smooth",
        });
    }
};
MagickQAMenuThreadsCard.styles = css `
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
__decorate([
    state()
], MagickQAMenuThreadsCard.prototype, "cards", void 0);
MagickQAMenuThreadsCard = __decorate([
    customElement("magick-qa-menu-threads-card")
], MagickQAMenuThreadsCard);
export { MagickQAMenuThreadsCard };
//# sourceMappingURL=magick-qa-menu-threads-card.js.map