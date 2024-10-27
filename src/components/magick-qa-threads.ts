import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("magick-qa-threads")
export class MagickQAThreads extends LitElement {
  static override styles = css`
    .magick-qa-threads {
      position: absolute;
      background-color: black;
      color: white;
      width: 200px;
      height: 150px;
      padding: 8px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 999997;
    }

    .card {
      position: absolute;
      background-color: #333;
      color: white;
      padding: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 999997;
      min-width: 200px;
      transition: all 0.3s ease;
    }

    .card.unsaved {
      border-radius: 5px;
    }

    .card.saved {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      min-width: 20px;
      padding: 0;
      cursor: pointer;
      overflow: hidden;
    }

    .card.saved:hover {
      border-radius: 5px;
      width: auto;
      height: auto;
      min-width: 200px;
      padding: 10px;
    }

    .card-content {
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    .card.saved .card-content {
      opacity: 0;
    }

    .card.saved:hover .card-content {
      opacity: 1;
    }

    .save-button {
      margin-top: 8px;
      padding: 4px 8px;
      background: #666;
      border: none;
      border-radius: 3px;
      color: white;
      cursor: pointer;
    }

    .save-button:hover {
      background: #777;
    }

    .hidden {
      display: none;
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

  @state() isCardCreationMode = false;
  @state() activeCard: number | null = null;
  @state() canCreateCard = false;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this.handleClick.bind(this));
  }

  override disconnectedCallback() {
    window.removeEventListener("click", this.handleClick.bind(this));
    super.disconnectedCallback();
  }

  setCardCreationMode(isActive: boolean) {
    this.isCardCreationMode = isActive;
    // if (!isActive) {
    //   this.cards = this.cards.filter((card) => card.saved);
    // }
    this.canCreateCard = false;
    this.activeCard = null;
  }

  handleClick(event: MouseEvent) {
    if (!this.isCardCreationMode) return;

    const target = event.target as HTMLElement;
    if (target.closest(".card") || target.closest(".save-button")) {
      return;
    }

    const x = event.pageX;
    const y = event.pageY;

    if (this.activeCard !== null) {
      // Update existing card position
      this.cards = this.cards.map((card) =>
        card.id === this.activeCard ? { ...card, x, y } : card
      );
    } else if (this.canCreateCard) {
      // Create new card
      const newCard = {
        x,
        y,
        id: Date.now(),
        location: window.location.href,
        saved: false,
        content: `Note created at ${new Date().toLocaleString()}`,
      };
      this.cards = [...this.cards, newCard];
      this.activeCard = newCard.id;
    } else {
      // Enable card creation for next click
      this.canCreateCard = true;
    }
  }

  handleSave(cardId: number) {
    this.cards = this.cards.map((card) =>
      card.id === cardId ? { ...card, saved: true } : card
    );
    this.activeCard = null;
    this.canCreateCard = false;
    // Save the updated cards to local storage
    localStorage.setItem("cards", JSON.stringify(this.cards));
  }

  // ${this.isCardCreationMode ? "" : "hidden"}

  override render() {
    return html`
      ${this.cards.map(
        (card) => html`
          <div
            class="card ${card.saved ? "saved" : "unsaved"}"
            style="left: ${card.x}px; top: ${card.y}px;"
          >
            <div class="card-content">
              ${card.content}
              ${!card.saved
                ? html`
                    <div>
                      <button
                        class="save-button"
                        @click=${() => this.handleSave(card.id)}
                      >
                        save
                      </button>
                    </div>
                  `
                : ""}
            </div>
          </div>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "magick-qa-threads": MagickQAThreads;
  }
}
