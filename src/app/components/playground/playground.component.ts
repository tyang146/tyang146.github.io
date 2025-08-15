import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, HostListener} from '@angular/core';

interface SnakeSegment {
    x: number;
    y: number;
}

interface Food {
    x: number;
    y: number;
}

@Component({
    selector: 'app-playground',
    standalone: true,
    templateUrl: './playground.component.html',
    styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {

    @ViewChild('matrixCanvas')
    private readonly matrixCanvasRef?: ElementRef<HTMLCanvasElement>;

    private animationFrameId: number | null = null;
    private isDestroyed = false;
    private isMatrixMode = true;
    private isTransitioning = false;
    private transitionProgress = 0;

    // Snake game state
    private snake: SnakeSegment[] = [];
    private food: Food = { x: 0, y: 0 };
    private direction = { x: 1, y: 0 };
    private nextDirection = { x: 1, y: 0 };
    private gameSpeed = 150;
    private lastUpdate = 0;
    private score = 0;
    private gameOver = false;

    ngAfterViewInit(): void {
        const canvas = this.matrixCanvasRef?.nativeElement;
        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        const setCanvasSize = () => {
            const parent = canvas.parentElement;
            const width = parent ? parent.clientWidth : window.innerWidth;
            const height = parent ? Math.max(400, parent.clientHeight) : window.innerHeight * 0.8;
            canvas.width = width;
            canvas.height = height;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Matrix rain setup
        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = characters.split('');

        const matrixState = {
            fontSize: 16,
            columns: 0 as number,
            drops: [] as number[],
            speedMultiplier: 1.0
        };

        const initDrops = () => {
            matrixState.columns = Math.floor(canvas.width / matrixState.fontSize);
            matrixState.drops = new Array(matrixState.columns).fill(1);
        };

        initDrops();

        const drawMatrixFrame = () => {
            if (this.isDestroyed || !this.isMatrixMode) {
                return;
            }

            // Fade the entire canvas slightly to create trail effect
            context.fillStyle = 'rgba(0, 0, 0, 0.08)';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#0F0';
            context.font = `${matrixState.fontSize}px monospace`;

            for (let i = 0; i < matrixState.drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * matrixState.fontSize;
                const y = matrixState.drops[i] * matrixState.fontSize;
                context.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    matrixState.drops[i] = 0;
                }
                matrixState.drops[i] += matrixState.speedMultiplier;
            }

            this.animationFrameId = requestAnimationFrame(drawMatrixFrame);
        };

        // Snake game functions
        const initSnakeGame = () => {
            const gridSize = 20;
            const cols = Math.floor(canvas.width / gridSize);
            const rows = Math.floor(canvas.height / gridSize);

            this.snake = [
                { x: Math.floor(cols / 2), y: Math.floor(rows / 2) }
            ];
            this.direction = { x: 1, y: 0 };
            this.nextDirection = { x: 1, y: 0 };
            this.score = 0;
            this.gameOver = false;
            this.generateFood(cols, rows);
        };

        const generateFood = (cols: number, rows: number) => {
            const gridSize = 20;
            do {
                this.food.x = Math.floor(Math.random() * cols);
                this.food.y = Math.floor(Math.random() * rows);
            } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
        };

        const updateSnake = () => {
            if (this.gameOver) return;

            const now = Date.now();
            if (now - this.lastUpdate < this.gameSpeed) return;
            this.lastUpdate = now;

            this.direction = { ...this.nextDirection };
            const head = { ...this.snake[0] };
            const newHead = {
                x: head.x + this.direction.x,
                y: head.y + this.direction.y
            };

            const gridSize = 20;
            const cols = Math.floor(canvas.width / gridSize);
            const rows = Math.floor(canvas.height / gridSize);

            // Check wall collision
            if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
                this.gameOver = true;
                return;
            }

            // Check self collision
            if (this.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                this.gameOver = true;
                return;
            }

            this.snake.unshift(newHead);

            // Check food collision
            if (newHead.x === this.food.x && newHead.y === this.food.y) {
                this.score += 10;
                this.generateFood(cols, rows);
                // Increase speed
                this.gameSpeed = Math.max(50, this.gameSpeed - 2);
            } else {
                this.snake.pop();
            }
        };

        const drawSnakeFrame = () => {
            if (this.isDestroyed || this.isMatrixMode) {
                return;
            }

            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);

            const gridSize = 20;

            // Draw snake
            context.fillStyle = '#0F0';
            this.snake.forEach((segment, index) => {
                if (index === 0) {
                    context.fillStyle = '#00FF00'; // Brighter green for head
                } else {
                    context.fillStyle = '#0F0';
                }
                context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
            });

            // Draw food
            context.fillStyle = '#FF0000';
            context.fillRect(this.food.x * gridSize, this.food.y * gridSize, gridSize - 1, gridSize - 1);

            // Draw score
            context.fillStyle = '#FFF';
            context.font = '20px Arial';
            context.fillText(`Score: ${this.score}`, 10, 30);

            if (this.gameOver) {
                context.fillStyle = 'rgba(0, 0, 0, 0.7)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = '#FFF';
                context.font = '40px Arial';
                context.textAlign = 'center';
                context.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
                context.font = '20px Arial';
                context.fillText(`Final Score: ${this.score}`, canvas.width / 2, canvas.height / 2 + 20);
                context.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 50);
                context.textAlign = 'left';
            }

            updateSnake();
            this.animationFrameId = requestAnimationFrame(drawSnakeFrame);
        };

        const transitionToSnake = () => {
            this.isTransitioning = true;
            this.transitionProgress = 0;

            const transitionDuration = 2000; // 2 seconds
            const startTime = Date.now();

            const transitionFrame = () => {
                if (this.isDestroyed) return;

                const elapsed = Date.now() - startTime;
                this.transitionProgress = Math.min(elapsed / transitionDuration, 1);

                // Clear canvas
                context.fillStyle = '#000';
                context.fillRect(0, 0, canvas.width, canvas.height);

                // Draw matrix rain with fading effect
                context.fillStyle = `rgba(0, 255, 0, ${1 - this.transitionProgress})`;
                context.font = `${matrixState.fontSize}px monospace`;

                for (let i = 0; i < matrixState.drops.length; i++) {
                    const text = charArray[Math.floor(Math.random() * charArray.length)];
                    const x = i * matrixState.fontSize;
                    const y = matrixState.drops[i] * matrixState.fontSize;
                    context.fillText(text, x, y);
                    matrixState.drops[i] += matrixState.speedMultiplier * 3; // Speed up during transition
                }

                // Draw snake game elements appearing
                if (this.transitionProgress > 0.5) {
                    const snakeAlpha = (this.transitionProgress - 0.5) * 2;
                    const gridSize = 20;
                    const cols = Math.floor(canvas.width / gridSize);
                    const rows = Math.floor(canvas.height / gridSize);

                    // Initialize snake if not done yet
                    if (this.snake.length === 0) {
                        this.snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
                        this.generateFood(cols, rows);
                    }

                    // Draw snake with fade-in effect
                    context.fillStyle = `rgba(0, 255, 0, ${snakeAlpha})`;
                    this.snake.forEach((segment, index) => {
                        if (index === 0) {
                            context.fillStyle = `rgba(0, 255, 0, ${snakeAlpha})`;
                        }
                        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
                    });

                    // Draw food with fade-in effect
                    context.fillStyle = `rgba(255, 0, 0, ${snakeAlpha})`;
                    context.fillRect(this.food.x * gridSize, this.food.y * gridSize, gridSize - 1, gridSize - 1);
                }

                if (this.transitionProgress < 1) {
                    this.animationFrameId = requestAnimationFrame(transitionFrame);
                } else {
                    this.isMatrixMode = false;
                    this.isTransitioning = false;
                    drawSnakeFrame();
                }
            };

            transitionFrame();
        };

        const onResize = () => {
            setCanvasSize();
            if (this.isMatrixMode) {
                initDrops();
            } else {
                initSnakeGame();
            }
        };

        const onClick = () => {
            if (this.isMatrixMode && !this.isTransitioning) {
                // Speed up matrix rain first
                matrixState.speedMultiplier = 3;
                
                // After a short delay, transition to snake game
                setTimeout(() => {
                    if (!this.isDestroyed) {
                        transitionToSnake();
                    }
                }, 1000);
            } else if (!this.isMatrixMode && this.gameOver) {
                // Restart snake game
                initSnakeGame();
            }
        };

        window.addEventListener('resize', onResize);
        canvas.addEventListener('click', onClick);

        // Initial background
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        drawMatrixFrame();

        // Cleanup on destroy
        const cleanup = () => {
            window.removeEventListener('resize', onResize);
            canvas.removeEventListener('click', onClick);
            if (this.animationFrameId !== null) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        };

        // Attach cleanup to instance for ngOnDestroy
        (this as any)._cleanup = cleanup;
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {

        if (this.isMatrixMode || this.isTransitioning) return;

        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                if (this.direction.y === 0) {
                    this.nextDirection = { x: 0, y: -1 };
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (this.direction.y === 0) {
                    this.nextDirection = { x: 0, y: 1 };
                }
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (this.direction.x === 0) {
                    this.nextDirection = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (this.direction.x === 0) {
                    this.nextDirection = { x: 1, y: 0 };
                }
                break;
            case ' ':
                event.preventDefault();
                if (this.gameOver) {
                    // Restart game
                    const canvas = this.matrixCanvasRef?.nativeElement;
                    if (canvas) {
                        const context = canvas.getContext('2d');
                        if (context) {
                            const gridSize = 20;
                            const cols = Math.floor(canvas.width / gridSize);
                            const rows = Math.floor(canvas.height / gridSize);
                            this.snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
                            this.direction = { x: 1, y: 0 };
                            this.nextDirection = { x: 1, y: 0 };
                            this.score = 0;
                            this.gameOver = false;
                            this.gameSpeed = 150;
                            this.generateFood(cols, rows);
                        }
                    }
                }
                break;
        }
    }

    private generateFood(cols: number, rows: number) {
        const gridSize = 20;
        do {
            this.food.x = Math.floor(Math.random() * cols);
            this.food.y = Math.floor(Math.random() * rows);
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
        const cleanup = (this as any)._cleanup as (() => void) | undefined;
        if (cleanup) {
            cleanup();
        }
    }
}


