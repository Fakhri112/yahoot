import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

function QuizReportPlayers() {
    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log("Element is visible");
                // You can perform additional actions when the element is visible
            }
        });
    };

    useEffect(() => {
        // Create an Intersection Observer instance
        const observer = new IntersectionObserver(handleIntersection);

        // Get the target element you want to observe
        const targetElement = document.querySelector("#targetElement");

        // Observe the target element
        if (targetElement) {
            observer.observe(targetElement);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
        <div>
            <div style={{ height: "100vh" }}>
                Scroll down to observe the visibility of the element.
            </div>
            <div className="box" id="targetElement">
                Target Element
            </div>
        </div>
    );
}

export default QuizReportPlayers;
