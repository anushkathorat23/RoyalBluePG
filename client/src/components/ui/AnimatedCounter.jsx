import { useCounter } from '../../hooks/useAnimations';

const AnimatedCounter = ({ end, suffix = '+', title, className = '' }) => {
  const { count, ref } = useCounter(end, 2000);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <div className="text-4xl font-bold gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </div>
    </div>
  );
};

export default AnimatedCounter;
