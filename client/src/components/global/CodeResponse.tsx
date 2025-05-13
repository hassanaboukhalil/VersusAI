import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CodeResponseProps {
    code: string;
    language: string;
}

const CodeResponse: React.FC<CodeResponseProps> = ({ code, language }) => {
    const handleCopyCode = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard!');
    };

    return (
        <div className="relative rounded-lg overflow-hidden bg-[#1E1E1E] border border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D]">
                <span className="text-sm text-gray-300">{language}</span>
                <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                    <Copy size={16} />
                    Copy code
                </button>
            </div>
            <div className="p-4">
                <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: 'transparent',
                    }}
                    showLineNumbers={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeResponse;
