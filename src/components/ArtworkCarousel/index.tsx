import React, { useState, useEffect, useRef } from 'react';

interface Artwork {
  id: number;
  src: string;
  title: string;
  artist: string;
}

interface ArtworkCarouselProps {
  artworks?: Artwork[];
  speed?: number; // Movement speed (pixels per second)
  autoplay?: boolean; // Whether to auto-scroll
  direction?: 'left' | 'right'; // Fixed direction of movement
}

const ArtworkCarousel: React.FC<ArtworkCarouselProps> = ({ 
  artworks = [],
  speed = 100,
  autoplay = true,
  direction = 'left'
}) => {
  const [position, setPosition] = useState(0);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<Artwork | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);
  const transitionRef = useRef(true);

  // Fixed scrollDirection instead of changing based on page scroll
  const scrollDirection = direction === 'left' ? -1 : 1;

  // Sample artworks data - use this if no artworks are provided
  const sampleArtworks: Artwork[] = [
    { id: 1, src: '/images/portfolio/1.jpg', title: 'Eyo Eko', artist: 'Shally Oluwa' },
    { id: 2, src: '/images/portfolio/2.jpg', title: 'This is Beautiful world', artist: 'Shally Oluwa' },
    { id: 3, src: '/images/portfolio/3.jpg', title: 'Culture', artist: 'Shally Oluwa' },
    { id: 4, src: '/images/portfolio/4.jpg', title: 'IF YOU WERE IN MY SHOES *II', artist: 'Lekan Amosu' },
    { id: 5, src: '/images/portfolio/5.jpg', title: 'IF YOU WERE IN MY SHOES *I', artist: 'Lekan Amosu' },
    { id: 6, src: '/images/portfolio/6.jpg', title: 'The Night Watch', artist: 'Rembrandt' },
    { id: 7, src: '/images/portfolio/7.jpg', title: 'Roses', artist: 'Silver Ona' },
    { id: 8, src: '/images/portfolio/8.jpg', title: 'Water Lilies', artist: 'Silver Ona' },
  ];

  // Use provided artworks or fallback to sample data
  const displayArtworks = artworks.length > 0 ? artworks : sampleArtworks;

  // Clone the first few items to the end and the last few to the beginning for seamless looping
  const getLoopedArtworks = () => {
    // Clone the entire array multiple times to ensure we have plenty of items for infinite scrolling
    return [...displayArtworks, ...displayArtworks, ...displayArtworks];
  };

  const loopedArtworks = getLoopedArtworks();
  const totalItemCount = loopedArtworks.length;

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        setCarouselWidth(width);
        
        // Calculate item width based on screen size
        let itemsPerView = 2.5; // Default for desktop
        if (width < 640) { // Mobile
          itemsPerView = 1.2;
        } else if (width < 1024) { // Tablet
          itemsPerView = 1.8;
        }
        
        setItemWidth(width / itemsPerView);
      }
    };

    // Initial calculation
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // True infinite scrolling implementation
  const handleInfiniteScroll = () => {
    const totalWidth = itemWidth * displayArtworks.length;
    
    // When we've scrolled one full set to the left
    if (position <= -totalWidth) {
      // Turn off transitions
      transitionRef.current = false;
      // Reset position to the start
      setPosition(prevPosition => prevPosition + totalWidth);
      // Re-enable transitions after a brief delay
      setTimeout(() => {
        transitionRef.current = true;
      }, 50);
    }
    
    // When we've scrolled one full set to the right
    if (position > 0) {
      // Turn off transitions
      transitionRef.current = false;
      // Reset position to the end
      setPosition(prevPosition => prevPosition - totalWidth);
      // Re-enable transitions after a brief delay
      setTimeout(() => {
        transitionRef.current = true;
      }, 50);
    }
  };

  // Animation loop for auto-scrolling
  useEffect(() => {
    if (!autoplay || isDragging || !itemWidth) return;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp.current) {
        lastTimestamp.current = timestamp;
      }

      const delta = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      if (hoveredItemIndex === null && !isDragging) {
        // Calculate how much to move based on time delta and direction
        const moveAmount = (speed * delta / 1000) * scrollDirection;
        
        // Update position
        let newPosition = position + moveAmount;
        setPosition(newPosition);
        
        // Handle infinite scrolling
        handleInfiniteScroll();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, hoveredItemIndex, speed, scrollDirection, autoplay, isDragging, itemWidth]);

  // Touch/Mouse event handlers for swiping
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    
    // Pause animation while dragging
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    // Apply the drag offset to the position
    setPosition(prevPosition => prevPosition + dragOffset);
    
    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
    
    // Handle infinite scrolling after drag
    handleInfiniteScroll();
    
    // Reset timestamp for smooth animation restart
    lastTimestamp.current = null;
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Set up global mouse handlers for smoother dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX);
      };
      
      const handleGlobalMouseUp = () => {
        handleDragEnd();
      };
      
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging]);

  // Handle item click to show preview
  const handleItemClick = (artwork: Artwork) => {
    // Only treat as a click if there was minimal dragging
    if (Math.abs(dragOffset) < 5) {
      setPreviewItem(artwork);
      setShowPreview(true);
    }
  };

  // Close preview modal
  const closePreview = () => {
    setShowPreview(false);
  };

  // Prevent body scrolling when preview is open
  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreview]);

  return (
    <div 
      className="relative w-full overflow-hidden h-auto my-8" 
      ref={carouselRef}
      style={{ height: '96px', minHeight: '450px', maxHeight: '50vh' }}
    >
      <div 
        className="flex h-full"
        style={{ 
          transform: `translateX(${position + dragOffset}px)`, 
          transition: !transitionRef.current || isDragging ? 'none' : hoveredItemIndex !== null ? 'none' : 'transform 0.05s linear',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        ref={itemsRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {loopedArtworks.map((artwork, index) => (
          <div
            key={`${artwork.id}-${index}`}
            className="relative h-full flex-shrink-0 px-2 sm:px-4 md:px-6"
            style={{ width: `${itemWidth}px` }}
            onMouseEnter={() => !isDragging && setHoveredItemIndex(index)}
            onMouseLeave={() => setHoveredItemIndex(null)}
            onClick={() => handleItemClick(artwork)}
          >
            <img 
              src={artwork.src} 
              alt={artwork.title} 
              className="w-full h-full object-cover rounded-lg"
              draggable="false" // Prevent image dragging interfering with swipe
            />
            
            {hoveredItemIndex === index && !isDragging && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-2 sm:p-4 md:p-6 text-white rounded-lg transition-opacity duration-300">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">{artwork.title}</h3>
                <p className="text-sm sm:text-base md:text-lg">by {artwork.artist}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showPreview && previewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button 
              onClick={closePreview}
              className="absolute top-4 right-4 bg-white text-black font-bold rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-10"
              aria-label="Close preview"
            >
              ✕
            </button>
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative w-full h-full max-w-4xl flex flex-col">
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  <img 
                    src={previewItem.src} 
                    alt={previewItem.title} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="bg-black bg-opacity-50 text-white p-4 rounded-b-lg w-full">
                  <h2 className="text-xl sm:text-2xl font-bold">{previewItem.title}</h2>
                  <p className="text-lg sm:text-xl">by {previewItem.artist}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkCarousel;