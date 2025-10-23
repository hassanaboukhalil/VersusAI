import { ImageUp } from 'lucide-react';
import Tooltip from '../../global/Tooltip';

const UploadPhotoIcon = ({ tooltipText }: { tooltipText: string }) => {
    return (
        <div className="flex-center p-2.5 absolute cursor-pointer">
            <div className="w-full h-full absolute bg-[#2C3139] opacity-80 rounded-full z-20" />
            <ImageUp className="z-30" color="white" />
            <Tooltip text={tooltipText} />
        </div>
    );
};
export default UploadPhotoIcon;
