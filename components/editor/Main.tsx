

import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowLeftRightIcon, PlusCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Main() {
    const [rating, setRating] = useState(9);
    const [type, setType] = useState<"feature" | "bug" | "general">("feature");
    const [message, setMessage] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0)


    const questions = [
        {
            id: 1,
            type: 'rating',
            question: 'How would you rate our service?',
            scale: 10
        },
        {
            id: 2,
            type: 'multiple-choice',
            question: 'What did you like the most?',
            options: ['Speed', 'Support', 'UI', 'Pricing']
        },
        {
            id: 3,
            type: 'yes-no',
            question: 'Would you recommend our service?'
        },
    ]

    const currentQuestion = questions[currentIndex]



    const renderQuestion = (q: any) => {
        switch (q.type) {
            case 'rating':
                return (
                    <div className="mt-6">
                        <div className="flex flex-row justify-between">
                            <p className="mb-2 text-sm font-medium text-gray-700">How would you rate our service?</p>
                            <Tooltip>
                                <TooltipTrigger>
                                    <PlusCircle size={15} className="text-sm font-medium text-gray-700 cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    Add new question
                                </TooltipContent>
                            </Tooltip>

                        </div>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setRating(n)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${rating === n
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {n}
                                </button>
                            ))}
                            <span className="ml-1 text-yellow-400">★</span>
                        </div>
                    </div>
                )

            case 'multiple-choice':
                return (
                    <div className="space-y-2">
                        {q.options.map((opt: string, i: number) => (
                            <label key={i} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    value={opt}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                )


            case 'yes-no':
                return (
                    <div className="flex space-x-4">
                        <button className="border px-4 py-1 rounded">Yes</button>
                        <button className="border px-4 py-1 rounded">No</button>
                    </div>
                )

            case 'text':
                return <textarea className="border w-full p-2 rounded" />

            default:
                return null
        }
    }





    return (
        <div className=" flex items-center justify-center bg-black/40 p-4   h-screen overflow-scroll hide-scrollbar pt-50">
            <ScrollArea className=" w-full max-w-md rounded-xl bg-white my-20 t-10 shadow-xl">
                {/* Close */}
                <button className="absolute right-4 top-3 text-xl text-gray-400 hover:text-gray-600">×</button>

                <div className="w-full  rounded-t-xl overflow-hidden shadow-xl bg-linear-to-b from-slate-600 to-slate-500 text-white">
                    {/* Header */}
                    <div className="relative p-6">
                        <div className="flex items-center gap-2 mt-4">
                            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold">Up</div>
                            <img
                                src="https://i.pravatar.cc/40?img=12"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <img
                                src="https://i.pravatar.cc/40?img=32"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                        </div>

                        <h1 className="mt-8 text-3xl font-bold leading-snug">
                            Hi there 👋<br />
                            We’d Love Your Feedback!
                        </h1>
                        <p className="text-sm text-white">Tell us about your experience.</p>
                    </div>

                    {/* Body */}

                </div>

                <div className="p-4">
                    {type === "bug" ? (
                        <BugReport message={message} setMessage={setMessage} />
                    ) : type === "general" ? (
                        <GeneralFeedback message={message} setMessage={setMessage} />
                    ) : (
                        <>
                            {/* Navigation */}
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={() => setCurrentIndex(i => i - 1)}
                                    disabled={currentIndex === 0}
                                    className="px-3 py-1 border rounded disabled:opacity-40"
                                >
                                    ←
                                </button>

                                <span className="text-sm text-gray-500">
                                    {currentIndex + 1} / {questions.length}
                                </span>

                                <button
                                    onClick={() => setCurrentIndex(i => i + 1)}
                                    disabled={currentIndex === questions.length - 1}
                                    className="px-3 py-1 border rounded disabled:opacity-40"
                                >
                                    →
                                </button>
                            </div>

                            {/* Question */}
                            <div className="flex justify-center mt-4">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-lg">
                                        {currentQuestion.question}
                                    </h3>
                                    {renderQuestion(currentQuestion)}
                                </div>
                            </div>

                            {/* Feature Request textarea */}
                            <div className="mt-5">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    What can we improve?
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Share your thoughts…"
                                    className="w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    rows={4}
                                />
                            </div>
                        </>
                    )}


                    {/* Type selector */}
                    <div className="mt-4 flex gap-2">
                        {([
                            ["feature", "Feature Request"],
                            ["bug", "Bug Report"],
                            ["general", "General Feedback"],
                        ] as const).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setType(key)}
                                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium transition ${type === key
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Upload */}
                    <button className="mt-4 w-full rounded-md border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-100">
                        📎 Upload Screenshot
                    </button>

                    {/* Submit */}
                    <button className="mt-5 w-full rounded-md bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
                        Submit Feedback
                    </button>

                    <p className="mt-3 text-center text-xs text-gray-400">Your feedback is anonymous.</p>
                </div>





            </ScrollArea>
        </div>
    );
}




export function BugReport({
    message,
    setMessage,
}: {
    message: string
    setMessage: (v: string) => void
}) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Report a Bug 🐞</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    What went wrong?
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the bug clearly…"
                    className="mt-1 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    rows={4}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Steps to reproduce
                </label>
                <textarea
                    placeholder="1. Go to...\n2. Click...\n3. Error happens"
                    className="mt-1 w-full resize-none rounded-md border border-gray-300 p-3 text-sm"
                    rows={4}
                />
            </div>

            <button className="w-full rounded-md border border-dashed border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-100">
                📎 Upload Screenshot / Video
            </button>
        </div>
    )
}



export function GeneralFeedback({
    message,
    setMessage,
}: {
    message: string
    setMessage: (v: string) => void
}) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">General Feedback </h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Share your feedback
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think, suggestions, ideas, or concerns…"
                    className="mt-1 w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    rows={5}
                />
            </div>

            <div className="flex gap-2">
                <button className="flex-1 rounded-md border px-3 py-2 text-sm hover:bg-gray-100">
                    👍 Positive
                </button>
                <button className="flex-1 rounded-md border px-3 py-2 text-sm hover:bg-gray-100">
                    👎 Needs Improvement
                </button>
            </div>
        </div>
    )
}

