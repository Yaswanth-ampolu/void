import { IconWarning } from '../sidebar-tsx/SidebarChat.js';


export const WarningBox = ({ text, onClick, className }: {text: string;onClick?: () => void;className?: string;}) => {

  return <div
    className={` pinnacleai-text-pinnacleai-warning pinnacleai-brightness-90 pinnacleai-opacity-90 pinnacleai-w-fit pinnacleai-text-xs pinnacleai-text-ellipsis ${


    onClick ? `hover:pinnacleai-brightness-75 pinnacleai-transition-all pinnacleai-duration-200 pinnacleai-cursor-pointer` : ""} pinnacleai-flex pinnacleai-items-center pinnacleai-flex-nowrap ${

    className} `}

    onClick={onClick}>
    
		<IconWarning
      size={14}
      className="pinnacleai-mr-1 pinnacleai-flex-shrink-0" />
    
		<span>{text}</span>
	</div>;
  // return <PinnacleAiSelectBox
  // 	options={[{ text: 'Please add a model!', value: null }]}
  // 	onChangeSelection={() => { }}
  // />
};