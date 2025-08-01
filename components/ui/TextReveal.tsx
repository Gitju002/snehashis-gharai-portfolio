import React, { useRef } from "react";
import {
  createTextRevealAnimation,
  TextRevealAnimationOptions,
} from "../../animations/text-reveal-anim";

interface TextRevealProps {
  text: string;
  trigger?: HTMLElement | null;
  className?: string;
  letterClassName?: string;
  wordClassName?: string;
  animationOptions?: TextRevealAnimationOptions;
  onRefsReady?: (
    refs: React.MutableRefObject<(HTMLSpanElement | null)[]>
  ) => void;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  trigger,
  className = "",
  letterClassName = "text-xl lg:text-2xl 2xl:text-[32px] font-normal font-dm-sans leading-tight",
  wordClassName = "",
  animationOptions,
  onRefsReady,
}) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    if (onRefsReady) {
      onRefsReady(refs);
    }
  }, [onRefsReady]);

  React.useEffect(() => {
    if (trigger) {
      createTextRevealAnimation(refs, trigger, animationOptions);
    }
  }, [trigger, animationOptions]);

  const splitLetters = (word: string, wordIndex: number) => {
    const letters: React.ReactElement[] = [];

    word.split("").forEach((letter, letterIndex) => {
      letters.push(
        <span
          key={`${letter}_${wordIndex}_${letterIndex}`}
          ref={(el) => {
            refs.current.push(el);
          }}
          className={`inline-block ${letterClassName}`}
        >
          {letter}
        </span>
      );
    });

    return letters;
  };

  const splitWords = (phrase: string) => {
    const elements: React.ReactElement[] = [];

    phrase.split(" ").forEach((word, wordIndex) => {
      const letters = splitLetters(word, wordIndex);

      elements.push(
        <span
          key={`${word}_${wordIndex}`}
          className={`inline-block mr-2 ${wordClassName}`}
        >
          {letters}
        </span>
      );
    });

    return elements;
  };

  return <div className={className}>{splitWords(text)}</div>;
};

export default TextReveal;

// Hook for custom usage
export const useTextReveal = (
  text: string,
  options?: {
    letterClassName?: string;
    wordClassName?: string;
  }
) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  const splitLetters = (word: string, wordIndex: number) => {
    const letters: React.ReactElement[] = [];

    word.split("").forEach((letter, letterIndex) => {
      letters.push(
        <span
          key={`${letter}_${wordIndex}_${letterIndex}`}
          ref={(el) => {
            refs.current.push(el);
          }}
          className={`inline-block ${
            options?.letterClassName ||
            "text-xl lg:text-2xl 2xl:text-[32px] font-normal font-dm-sans leading-tight"
          }`}
        >
          {letter}
        </span>
      );
    });

    return letters;
  };

  const splitWords = (phrase: string) => {
    const elements: React.ReactElement[] = [];

    phrase.split(" ").forEach((word, wordIndex) => {
      const letters = splitLetters(word, wordIndex);

      elements.push(
        <span
          key={`${word}_${wordIndex}`}
          className={`inline-block mr-2 ${options?.wordClassName || ""}`}
        >
          {letters}
        </span>
      );
    });

    return elements;
  };

  const elements = splitWords(text);

  return {
    elements,
    refs,
    createAnimation: (
      trigger: HTMLElement | null,
      animationOptions?: TextRevealAnimationOptions
    ) => {
      createTextRevealAnimation(refs, trigger, animationOptions);
    },
  };
};
