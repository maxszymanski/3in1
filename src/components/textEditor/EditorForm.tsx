'use client'
import { useState } from 'react'
import PageTitle from '../ui/PageTitle'

function EditorForm() {
	const [fileName, setFileName] = useState<string | null>(null)
	const [text, setText] = useState<string | null>(null)
	const [processed, setProcessed] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.name.toLowerCase().endsWith('.txt')) {
			setError('Dozwolone są tylko pliki .txt')
			setFileName(null)
			setText(null)
			return
		}

		setError(null)
		setFileName(file.name)

		const reader = new FileReader()
		reader.onload = (event: ProgressEvent<FileReader>) => {
			const result = event.target?.result as string
			setText(result)
		}
		reader.readAsText(file, 'UTF-8')
	}

	const shuffleWord = (word: string): string => {
		if (word.length <= 3) return word

		const first = word[0]
		const last = word[word.length - 1]
		const middleLetters = word.slice(1, -1).split('')

		//   Fisher-Yates shuffle

		for (let i = middleLetters.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const k = middleLetters[i]
			middleLetters[i] = middleLetters[j]
			middleLetters[j] = k
		}

		return first + middleLetters.join('') + last
	}

	const processText = () => {
		if (!text) return
		const result = text.replace(/(\p{L}|\p{N})+/gu, word => shuffleWord(word))
		setProcessed(result)
	}

	const resetForm = () => {
		setText(null)
		setProcessed(null)
	}

	return (
		<section className="w-full">
			<PageTitle title="Edytor Tekstu" />

			<div className="pt-8 flex items-center justify-evenly flex-wrap w-full gap-6">
				<div>
					<input id="fileUpload" type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />

					<label
						htmlFor="fileUpload"
						className="cursor-pointer bg-primary2 text-white px-4 py-2 rounded-lg shadow hover:bg-primary transition-colors duration-300 ">
						{text ? 'Zmień plik' : 'Wybierz plik '}
					</label>
				</div>
				<button
					onClick={processText}
					disabled={!text}
					className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors duration-300 my-outline cursor-pointer text-sm sm:text-base disabled:cursor-not-allowed">
					Zamieszaj tekst
				</button>
			</div>
			{error && <p className="mt-6 text-red-600 font-medium text-center">{error}</p>}
			{fileName && <p className="mt-6 text-primary text-sm sm:text-base text-center">Wybrany plik: {fileName}</p>}
			{text && (
				<>
					<div className="w-full max-w-2xl mx-auto mt-6">
						<h2 className="font-semibold mb-2">Oryginalny tekst:</h2>
						<pre className="bg-white p-3 rounded shadow whitespace-pre-wrap wrap-break-word border border-gray-200 max-h-[350px] overflow-y-auto">
							{text}
						</pre>

						<h2 className="font-semibold mt-4 mb-2">Wynik:</h2>
						<pre className="bg-purple-100 p-3 rounded shadow whitespace-pre-wrap wrap-break-word border border-purple-300 max-h-[350px] overflow-y-auto">
							{processed || '(kliknij „Zamieszaj tekst”)'}
						</pre>
					</div>
					<div className="flex justify-center pt-8">
						<button
							onClick={resetForm}
							className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors duration-300 my-outline cursor-pointer text-sm sm:text-base">
							Resetuj
						</button>
					</div>
				</>
			)}
		</section>
	)
}

export default EditorForm
