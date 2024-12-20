import React, {useEffect, useState} from "react";
import {useSlider} from "@/context/SliderContext";
import Image from "next/image";
import SliderImageLoading from "@/components/userUiLoading/Home/SliderImageLoading";


const SliderImage = React.memo(() => {
    const {images, loading, error} = useSlider();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 8000);
            return () => clearInterval(intervalId);
        }
    }, [images]);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="">
            {loading ? (
                <SliderImageLoading/>
            ) : (
                <div className="relative overflow-hidden h-[350px] sm:h-[450px] lg:h-[550px]" style={{width: "100%"}}>
                    {images.length > 0 && (
                        <Image
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            priority
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={100}
                        />
                    )}

                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition duration-300"
                        aria-label="Previous Image"
                    >
                        &#10094;
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-200 transition duration-300"
                        aria-label="Next Image"
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </div>
    );
});

SliderImage.displayName = "SliderImage";

export default SliderImage;