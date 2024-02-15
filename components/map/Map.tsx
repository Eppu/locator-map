import dynamic from 'next/dynamic';
import { MapProps } from '@/types';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift
const DEFAULT_WIDTH = 2;
const DEFAULT_HEIGHT = 1;

const Map: React.FC<MapProps> = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;

  return (
    <div style={{ aspectRatio: `${width} / ${height}` }} className="w-full">
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
