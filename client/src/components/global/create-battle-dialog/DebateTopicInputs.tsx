import { Input } from '../../ui/input';

interface DebateTopicInputsProps {
    topic1: string;
    topic2: string;
    onTopic1Change: (value: string) => void;
    onTopic2Change: (value: string) => void;
}

const DebateTopicInputs = ({
    topic1,
    topic2,
    onTopic1Change,
    onTopic2Change,
}: DebateTopicInputsProps) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="text-lg block">First Debate Topic</label>
                <Input
                    value={topic1}
                    onChange={(e) => onTopic1Change(e.target.value)}
                    placeholder="Enter first topic (e.g., Summer)"
                    className="mt-1"
                />
            </div>
            <div>
                <label className="text-lg block">Second Debate Topic</label>
                <Input
                    value={topic2}
                    onChange={(e) => onTopic2Change(e.target.value)}
                    placeholder="Enter second topic (e.g., Winter)"
                    className="mt-1"
                />
            </div>
        </div>
    );
};

export default DebateTopicInputs;
