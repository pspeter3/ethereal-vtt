import { Application, Graphics } from "pixi.js";
import { Viewport } from "pixi-viewport";

/**
 * VirtualTableTop contains the logic for the virtual table top.
 */
export class VirtualTableTop {
    private app: Application;
    private viewport: Viewport;

    /**
     * Construct the VirtualTableTop.
     * @param container The HTMLElement that contains the application.
     */
    constructor(container: HTMLElement) {
        this.app = new Application({ resizeTo: window });
        container.appendChild(this.app.view);
        const worldWidth = 2048;
        const worldHeight = 2048;
        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth,
            worldHeight,
            interaction: this.app.renderer.plugins.interaction,
        });
        this.app.stage.addChild(this.viewport);
        this.viewport
            .drag()
            .pinch()
            .wheel()
            .clampZoom({ minScale: 0.25, maxScale: 1 });
        const graphics = new Graphics();
        graphics.beginFill(0xECEFF4);
        graphics.drawRect(0, 0, worldWidth, worldHeight);
        graphics.endFill();
        graphics.lineStyle(4, 0xD8DEE9);
        const cell = 64;
        for (let i = 0; i <= worldWidth; i += cell) {
            graphics.moveTo(i, 0);
            graphics.lineTo(i, worldHeight);
            graphics.moveTo(0, i);
            graphics.lineTo(worldWidth, i);
        }
        graphics.closePath();
        graphics.cacheAsBitmap;
        this.viewport.addChild(graphics);
        
        window.addEventListener("resize", this.onResize);
    }

    /**
     * Destroys the application.
     */
    destroy(): void {
        this.app.destroy();
        window.removeEventListener("resize", this.onResize);
    }

    private onResize = () => {
        this.viewport.resize(window.innerWidth, window.innerHeight);
    };
}
