import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
interface CodeEditorProps {
	onChange(value: string): void;
	value: string;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, value }) => {
	const ref = useRef<editor.IStandaloneCodeEditor | null>(null);
	const formatCode = () => {
		const value = ref.current!.getModel()?.getValue();
		if (!value) return;
		const format = prettier
			.format(value, {
				parser: 'babel',
				plugins: [parser],
				useTabs: true,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');
		ref.current?.setValue(format);
	};
	return (
		<div className='editor-wrapper'>
			<button className='button button-format is-primary is-small' onClick={formatCode}>
				Format
			</button>

			<Editor
				height='100%'
				width='100%'
				defaultLanguage='javascript'
				theme='vs-dark'
				defaultValue={
					value.trim().length
						? value
						: `//lets write some JS code import any (Module) and use it right away 😈`
				}
				onChange={(e) => {
					onChange(e!);
				}}
				onMount={(editor) => {
					ref.current = editor;
				}}
				options={{
					wordWrap: 'on',
					smoothScrolling: true,
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					tabSize: 2,
					automaticLayout: true,
					formatOnType: true,
					formatOnPaste: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
