'use client'


import Image from 'next/image'
import { useState } from 'react'


const MainEditor = () => {


    const feedbackTemplates = [
        {
            id: 'form-feedback',
            title: 'Form Feedback',
            description: 'Collect general feedback, surveys, and feature requests.',
            useCase: 'General feedback collection',
            features: [
                'Long-form feedback',
                'Multiple question types',
                'Good for emails & dashboards'
            ]
        },
        {
            id: 'checkout-feedback',
            title: 'Checkout Feedback',
            description: 'Capture customer intent right after payment.',
            useCase: 'Conversion insights',
            features: [
                'Why did you purchase?',
                'What almost stopped you?',
                'Post-checkout feedback'
            ]
        },
        {
            id: 'nps-survey',
            title: 'NPS Survey',
            description: 'Measure customer loyalty using industry standard metrics.',
            useCase: 'Customer loyalty measurement',
            features: [
                '0–10 rating scale',
                'Likelihood to recommend',
                'Industry standard NPS'
            ]
        },
        {
            id: 'in-app-feedback',
            title: 'In-App Feedback',
            description: 'Collect contextual feedback directly inside your product.',
            useCase: 'Contextual product feedback',
            features: [
                'Floating feedback button',
                'Page-specific feedback',
                'Bug reporting'
            ]
        },
        {
            id: 'exit-intent-feedback',
            title: 'Exit Intent Feedback',
            description: 'Understand why users leave or churn.',
            useCase: 'Churn prevention',
            features: [
                'Triggered on exit',
                'Why are you leaving?',
                'Retention optimization'
            ]
        },
        {
            id: 'feature-feedback',
            title: 'Feature Feedback',
            description: 'Validate ideas and shape your product roadmap.',
            useCase: 'Product validation',
            features: [
                'Feature voting',
                'Roadmap insights',
                'PM-focused feedback'
            ]
        },
        {
            id: 'support-csat',
            title: 'Support Satisfaction (CSAT)',
            description: 'Measure support quality after ticket resolution.',
            useCase: 'Support performance',
            features: [
                'After ticket resolution',
                '1–5 satisfaction rating',
                'Support quality insights'
            ]
        }
    ]

    const questions = [
        {
            id: 1,
            type: 'rating',
            question: 'How do you rate our service?',
            scale: 5
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
        {
            id: 4,
            type: 'text',
            question: 'Do you have any recommendations?'
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const currentQuestion = questions[currentIndex]

    const renderQuestion = (q) => {
        switch (q.type) {
            case 'rating':
                return (
                    <div className="flex space-x-2">
                        {[...Array(q.scale)].map((_, i) => (
                            <button key={i} className="border px-3 py-1 rounded">
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )

            case 'multiple-choice':
                return q.options.map((opt, i) => (
                    <div key={i} className='flex flex-row'>
                        <label key={i} className="flex items-center space-x-2">
                            <input type="radio" name={q.id} />
                            <span>{opt}</span>
                        </label>
                    </div>

                ))

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
        <div className=''>



            <div className=" hidden   border-b md:flex flex-row space-x-6  text-sm font-medium items-center justify-between p-2">
                <h1 className="cursor-pointer hover:text-blue-600 rounded-sm bg-background p-1">Form Feedback</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Checkout Feedback</h1>
                <h1 className="cursor-pointer hover:text-blue-600">NPS Survey</h1>
                <h1 className="cursor-pointer hover:text-blue-600">In-App Feedback</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Exit Intent</h1>
                <h1 className="cursor-pointer hover:text-blue-600">Feature Feedback</h1>
            </div>
             <div className='w-8 h-8 relative p-2'>
                <Image src={'/logo.svg'} alt='logo' fill/>
             </div>
            <div className='h-90 w-full relative'>
                <Image src={'/brand.svg'} alt='brand' fill />
            </div>


            <div className='flex  justify-center'>

                {/* Question */}
                <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                        {currentQuestion.question}
                    </h3>
                    {renderQuestion(currentQuestion)}
                </div>

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

                

            </div>

        </div>


    )
}

export default MainEditor
