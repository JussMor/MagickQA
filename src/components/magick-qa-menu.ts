import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./magick-qa-menu-threads-card";

@customElement("magick-qa-menu")
export class MagickQAMenu extends LitElement {
  @property({ type: String }) alignment: string = "right"; // Track alignment (left or right)
  @state() isDragging = false; // Track dragging state
  @state() startX = 0; // Track initial X position during drag
  @state() dragDelta = 0; // Track drag distance

  static override styles = css`
    .magick-qa-menu-container {
      position: fixed;
      height: 100vh;
      width: auto; /* Full width for smaller screens */
      background-color: black;
      padding: 8px;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
      z-index: 999998;
      top: 0;
      left: 0;
      right: 0;
      transition: none; /* Disable transition by default (no lag when dragging) */
    }

    .magick-qa-menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
    }

    /* Default behavior for large screens */
    @media (min-width: 768px) {
      .magick-qa-menu-container {
        contain: layout paint;
        max-height: calc(100vh - 50px);
        top: 20px;
        bottom: 20px;
        width: 416px;
        padding: 8px;
        border-radius: 20px;
        transition: none; /* Disable during drag to avoid lag */
      }

      /* Aligned to the right */
      .right {
        right: 25px; /* Snap to 25px instead of 0px */
        left: auto;
      }

      /* Aligned to the left */
      .left {
        left: 25px; /* Snap to 25px instead of 0px */
        right: auto;
      }

      /* Add a grabbing cursor while dragging */
      .dragging {
        cursor: grabbing;
      }
    }
  `;

  override render() {
    return html`<section class="magick-qa-menu-container ${this.alignment}">
      <div
        class="magick-qa-menu-header  ${this.isDragging ? "dragging" : ""}"
        @mousedown="${this.startDrag}"
        @touchstart="${this.startDrag}"
      >
        <span>Branch</span>
        <span @click="${this.closeMenu}">X</span>
      </div>
      <div>
        <magick-qa-menu-threads-card></magick-qa-menu-threads-card>
      </div>
    </section>`;
  }

  override firstUpdated() {
    this.checkAlignment(); // Initial alignment check
    window.addEventListener("resize", this.onResize); // Add resize listener
  }

  override disconnectedCallback() {
    window.removeEventListener("resize", this.onResize); // Clean up event listener on disconnect
    super.disconnectedCallback();
  }

  closeMenu() {
    // Emit custom event to close the menu
    this.dispatchEvent(
      new CustomEvent("close-menu", { bubbles: true, composed: true })
    );
  }

  // Start the drag process
  startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault();

    const isTouch = event.type.startsWith("touch");
    const clientX = isTouch
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX;

    // Record the starting X position
    this.startX = clientX;
    this.dragDelta = 0; // Reset drag distance
    this.isDragging = true;

    // Disable transition during drag to avoid lag
    this.disableTransition();

    // Add mouse/touch move and end listeners
    window.addEventListener("mousemove", this.doDrag);
    window.addEventListener("mouseup", this.endDrag);
    window.addEventListener("touchmove", this.doDrag);
    window.addEventListener("touchend", this.endDrag);
  }

  // Update the horizontal position while dragging and track the drag distance
  doDrag = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;
    if (window.innerWidth < 768) return;

    const isTouch = event.type.startsWith("touch");
    const clientX = isTouch
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX;

    // Calculate the horizontal drag distance
    this.dragDelta = clientX - this.startX;

    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;

    // Move the container horizontally based on drag, but restrict it to the viewport
    const moveDistance = Math.max(
      Math.min(this.dragDelta, window.innerWidth), // Limit to the width of the screen
      -window.innerWidth
    );

    if (this.alignment === "right") {
      container.style.right = `${-moveDistance}px`;
      container.style.left = "auto";
    } else {
      container.style.left = `${moveDistance}px`;
      container.style.right = "auto";
    }
  };

  // End the drag and snap to left or right based on 40% drag movement
  endDrag = () => {
    this.isDragging = false;
    if (window.innerWidth < 768) return;

    // Enable transition for smooth movement
    this.enableTransition();

    const dragThreshold = window.innerWidth * 0.4; // 40% drag threshold

    if (Math.abs(this.dragDelta) > dragThreshold) {
      // If dragged more than 40% of the screen width, switch sides
      if (this.dragDelta > 0 && this.alignment === "left") {
        this.snapToRight();
      } else if (this.dragDelta < 0 && this.alignment === "right") {
        this.snapToLeft();
      }
    } else {
      // Snap back to the original side if not dragged far enough
      this.checkAlignment();
    }

    // Remove the event listeners for mousemove and mouseup
    window.removeEventListener("mousemove", this.doDrag);
    window.removeEventListener("mouseup", this.endDrag);
    window.removeEventListener("touchmove", this.doDrag);
    window.removeEventListener("touchend", this.endDrag);
  };

  // Enable smooth transition for snapping
  enableTransition() {
    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    container.style.transition =
      "left 0.6s ease-in-out, right 0.6s ease-in-out";
  }

  // Disable transition during drag for responsiveness
  disableTransition() {
    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    container.style.transition = "none";
  }

  // Snap to the left
  snapToLeft() {
    this.alignment = "left";
    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    container.style.left = "25px"; // Set left to 25px
    container.style.right = "auto";
  }

  // Snap to the right
  snapToRight() {
    this.alignment = "right";
    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    container.style.right = "25px"; // Set right to 25px
    container.style.left = "auto";
  }

  // Check the alignment and snap to the correct side if necessary
  checkAlignment() {
    if (window.innerWidth < 768) return;

    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    const rect = container.getBoundingClientRect();

    if (this.alignment === "left" && rect.left !== 25) {
      this.snapToLeft();
    } else if (
      this.alignment === "right" &&
      rect.right !== window.innerWidth - 25
    ) {
      this.snapToRight();
    }
  }

  // Handle viewport resize to ensure the box doesn't get lost
  onResize = () => {
    const container = this.shadowRoot?.querySelector(
      ".magick-qa-menu-container"
    ) as HTMLElement;
    const rect = container.getBoundingClientRect();

    // Ensure the container remains in view during resize
    if (rect.right > window.innerWidth) {
      this.snapToRight();
    } else if (rect.left < 25) {
      this.snapToLeft();
    }

    // For viewports < 768px, ensure the container is centered
    if (window.innerWidth < 768) {
      container.style.left = "0";
      container.style.right = "0";
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "magick-qa-menu": MagickQAMenu;
  }
}
