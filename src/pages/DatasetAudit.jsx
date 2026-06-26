import vocabularyData from '../data/vocabulary.json';
import auditVocabulary from '../utils/auditVocabulary';
import { useMemo, useState } from 'react';
import getDatasetInsights from '../utils/getDatasetInsights';
import { useEffect } from 'react';

function DatasetAudit({ onBack }) {
    const audit = auditVocabulary(vocabularyData.vocabulary);

    const insights = getDatasetInsights(vocabularyData.vocabulary);

    const [filter, setFilter] = useState('all');

    const [search, setSearch] = useState('');

    const issues = useMemo(() => {
        return [...audit.errors, ...audit.warnings, ...audit.infos];
    }, [audit]);

    const filteredIssues = useMemo(() => {
        let result = issues;

        if (filter === 'critical') {
            result = result.filter((issue) => issue.severity === 'critical');
        }

        if (filter === 'warning') {
            result = result.filter((issue) => issue.severity === 'warning');
        }

        if (filter === 'info') {
            result = result.filter((issue) => issue.severity === 'info');
        }

        if (search.trim()) {
            result = result.filter((issue) =>
                issue.word.toLowerCase().includes(search.toLowerCase()),
            );
        }

        return result;
    }, [issues, filter, search]);

    useEffect(() => {
        console.log(filteredIssues);
    }, [filteredIssues]);

    const healthScore = Math.max(
        0,
        Math.round(
            100 -
                ((audit.errors.length * 2 + audit.warnings.length) /
                    audit.totalWords) *
                    100,
        ),
    );

    return (
        <main className='flex min-h-screen items-center justify-center px-6 py-10'>
            <div className='w-full max-w-6xl'>
                <div className='mb-8 flex items-center justify-between'>
                    <button
                        onClick={onBack}
                        className='text-sm tracking-[0.15em] text-slate-500 uppercase hover:text-white'
                    >
                        ← Back
                    </button>

                    <h1 className='text-4xl font-black text-white'>
                        Dataset Audit
                    </h1>
                </div>

                <div className='mb-8 grid gap-6 md:grid-cols-5'>
                    <Card
                        title='Health Score'
                        value={`${healthScore}%`}
                        color='text-cyan-300'
                    />

                    <Card
                        title='Words'
                        value={audit.totalWords}
                        color='text-white'
                    />

                    <Card
                        title='Errors'
                        value={audit.errors.length}
                        color='text-red-400'
                    />

                    <Card
                        title='Warnings'
                        value={audit.warnings.length}
                        color='text-yellow-400'
                    />

                    <Card
                        title='Infos'
                        value={audit.infos?.length || 0}
                        color='text-cyan-400'
                    />
                </div>

                <div className='mb-8 rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                    <h2 className='mb-6 text-2xl font-bold text-white'>
                        📊 Dataset Insights
                    </h2>

                    <div className='grid gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
                        <div>
                            <h3 className='mb-3 text-cyan-300'>Categories</h3>

                            {Object.entries(insights.categoryCount).map(
                                ([name, count]) => (
                                    <p key={name} className='text-slate-300'>
                                        <span className='font-medium text-white'>
                                            {name}:
                                        </span>{' '}
                                        {count}
                                    </p>
                                ),
                            )}
                        </div>

                        <div>
                            <h3 className='mb-3 text-cyan-300'>Difficulty</h3>

                            {Object.entries(insights.difficultyCount).map(
                                ([name, count]) => (
                                    <p key={name} className='text-slate-300'>
                                        <span className='font-medium text-white'>
                                            {name}:
                                        </span>{' '}
                                        {count}
                                    </p>
                                ),
                            )}
                        </div>

                        <div className='mt-4'>
                            <h4 className='mb-2 text-cyan-300'>
                                CEFR Distribution
                            </h4>

                            <div className='space-y-1 text-sm'>
                                <p>Easy: {insights.easyPercentage}%</p>

                                <p>Medium: {insights.mediumPercentage}%</p>

                                <p>Hard: {insights.hardPercentage}%</p>
                            </div>
                        </div>

                        <div>
                            <h3 className='mb-3 text-cyan-300'>Word Types</h3>

                            {Object.entries(insights.wordTypeCount).map(
                                ([name, count]) => (
                                    <p key={name} className='text-slate-300'>
                                        <span className='font-medium text-white'>
                                            {name}:
                                        </span>{' '}
                                        {count}
                                    </p>
                                ),
                            )}
                        </div>
                    </div>

                    <div className='mt-8 grid grid-cols-1 gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-2'>
                        <div>
                            <p className='mb-2 text-cyan-300'>
                                Longest Example
                            </p>
                            <p className='text-slate-300'>
                                {insights.longestExample}
                            </p>
                        </div>

                        <div>
                            <p className='mb-2 text-cyan-300'>
                                Shortest Example
                            </p>
                            <p className='text-slate-300'>
                                {insights.shortestExample}
                            </p>
                        </div>
                    </div>

                    <div className='mt-8 border-t border-white/[0.08] pt-8'>
                        <h3 className='mb-6 text-cyan-300'>
                            Coverage Analysis
                        </h3>

                        <div className='space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0'>
                            {insights.coverageAnalysis.map((item) => {
                                const difficultyStats =
                                    insights.categoryDifficultyMatrix[
                                        item.category
                                    ];

                                let statusColor = 'emerald';

                                if (item.count < 15) {
                                    statusColor = 'red';
                                } else if (item.count < 40) {
                                    statusColor = 'yellow';
                                }

                                return (
                                    <div
                                        key={item.category}
                                        className={`rounded-2xl border p-5 ${
                                            statusColor === 'red'
                                                ? 'border-red-500/20 bg-red-500/[0.06]'
                                                : statusColor === 'yellow'
                                                  ? 'border-yellow-500/20 bg-yellow-500/[0.06]'
                                                  : 'border-emerald-500/20 bg-emerald-500/[0.04]'
                                        }`}
                                    >
                                        <div className='mb-4 flex items-center justify-between'>
                                            <h4 className='font-semibold text-white capitalize'>
                                                {item.category}
                                            </h4>

                                            <p className='font-semibold text-slate-400 text-white'>
                                                {item.count} words
                                            </p>
                                        </div>

                                        <div className='space-y-4'>
                                            {[
                                                {
                                                    label: 'Easy',
                                                    value: difficultyStats.easy,
                                                    target: 15,
                                                },
                                                {
                                                    label: 'Medium',
                                                    value: difficultyStats.medium,
                                                    target: 15,
                                                },
                                                {
                                                    label: 'Hard',
                                                    value: difficultyStats.hard,
                                                    target: 10,
                                                },
                                            ].map(
                                                ({ label, value, target }) => {
                                                    const percentage = Math.min(
                                                        (value / target) * 100,
                                                        100,
                                                    );

                                                    let barColor = 'bg-red-500';

                                                    if (percentage >= 80) {
                                                        barColor =
                                                            'bg-emerald-500';
                                                    } else if (
                                                        percentage >= 45
                                                    ) {
                                                        barColor =
                                                            'bg-yellow-400';
                                                    }

                                                    return (
                                                        <div
                                                            key={label}
                                                            className='space-y-1'
                                                        >
                                                            <div className='flex justify-between text-sm'>
                                                                <span className='text-slate-300'>
                                                                    {label}
                                                                </span>

                                                                <span className='text-white'>
                                                                    {value} /{' '}
                                                                    {target}
                                                                </span>
                                                            </div>

                                                            <div className='h-2 overflow-hidden rounded-full bg-white/10'>
                                                                <div
                                                                    className={`h-full rounded-full transition-all ${barColor}`}
                                                                    style={{
                                                                        width: `${percentage}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className='mt-8 border-t border-white/[0.08] pt-8'>
                        <h3 className='mb-6 text-cyan-300'>
                            📚 Pedagogical Insights
                        </h3>

                        <div className='space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0'>
                            {insights.pedagogicalInsights.map(
                                (insight, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-xl border p-4 ${
                                            insight.severity === 'warning'
                                                ? 'border-yellow-500/20 bg-yellow-500/[0.06]'
                                                : insight.severity === 'success'
                                                  ? 'border-emerald-500/20 bg-emerald-500/[0.06]'
                                                  : 'border-cyan-500/20 bg-cyan-500/[0.06]'
                                        }`}
                                    >
                                        <p className='text-sm text-white'>
                                            {insight.message}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    <div className='mt-8 border-t border-white/[0.08] pt-8'>
                        <h3 className='mb-6 text-cyan-300'>🎭 False Friends</h3>

                        <div className='space-y-3'>
                            {insights.falseFriendsFound.length === 0 ? (
                                <div className='rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4'>
                                    <p className='text-emerald-300'>
                                        ✓ No false friend issues detected.
                                    </p>
                                </div>
                            ) : (
                                <div className='space-y-3'>
                                    {insights.falseFriendsFound.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className='rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4'
                                            >
                                                <p className='font-semibold text-red-300'>
                                                    {item.word}
                                                </p>

                                                <p className='mt-2 text-sm text-slate-300'>
                                                    Expected:{' '}
                                                    {item.expectedMeaning}
                                                </p>

                                                <p className='text-sm text-slate-400'>
                                                    Dataset:{' '}
                                                    {item.currentMeaning}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                    <div className='flex gap-3'>
                        <button
                            onClick={() => setFilter('all')}
                            className={`rounded-xl px-4 py-2 ${
                                filter === 'all'
                                    ? 'bg-cyan-400/20 text-cyan-300'
                                    : 'bg-white/[0.03] text-slate-400'
                            }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setFilter('critical')}
                            className={`rounded-xl px-4 py-2 ${
                                filter === 'critical'
                                    ? 'bg-red-500/20 text-red-300'
                                    : 'bg-white/[0.03] text-slate-400'
                            }`}
                        >
                            Critical
                        </button>

                        <button
                            onClick={() => setFilter('warning')}
                            className={`rounded-xl px-4 py-2 ${
                                filter === 'warning'
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : 'bg-white/[0.03] text-slate-400'
                            }`}
                        >
                            Warnings
                        </button>

                        <button
                            onClick={() => setFilter('info')}
                            className={`rounded-xl px-4 py-2 ${
                                filter === 'info'
                                    ? 'bg-cyan-500/20 text-cyan-300'
                                    : 'bg-white/[0.03] text-slate-400'
                            }`}
                        >
                            Info
                        </button>
                    </div>

                    <input
                        type='text'
                        placeholder='Search word...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-white outline-none'
                    />
                </div>

                <p className='mb-6 text-sm text-slate-500'>
                    Showing {filteredIssues.length} issue(s)
                </p>

                <section className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                    <h2 className='mb-6 text-xl font-bold text-white'>
                        Issues Found
                    </h2>

                    {audit.errors.length === 0 &&
                        audit.warnings.length === 0 && (
                            <p className='text-emerald-400'>
                                ✅ No issues found.
                            </p>
                        )}

                    <div className='space-y-3'>
                        {filteredIssues.map((issue, index) => (
                            <div
                                key={index}
                                className={`rounded-2xl border p-5 ${
                                    issue.severity === 'critical'
                                        ? 'border-red-400/20 bg-red-500/[0.06]'
                                        : issue.severity === 'warning'
                                          ? 'border-yellow-400/20 bg-yellow-500/[0.06]'
                                          : 'border-cyan-400/20 bg-cyan-500/[0.06]'
                                }`}
                            >
                                <h3
                                    className={`mb-4 text-lg font-bold ${
                                        issue.severity === 'critical'
                                            ? 'text-red-300'
                                            : issue.severity === 'warning'
                                              ? 'text-yellow-300'
                                              : 'text-cyan-300'
                                    }`}
                                >
                                    {issue.severity === 'critical'
                                        ? '❌'
                                        : issue.severity === 'warning'
                                          ? '⚠'
                                          : 'ℹ'}{' '}
                                    {issue.word}
                                </h3>

                                <div className='grid gap-3 md:grid-cols-2'>
                                    <div>
                                        <p className='text-xs text-slate-500 uppercase'>
                                            Field
                                        </p>

                                        <p className='text-white'>
                                            {issue.field}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-slate-500 uppercase'>
                                            Current
                                        </p>

                                        <p className='text-white'>
                                            {issue.currentValue}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-slate-500 uppercase'>
                                            Suggested
                                        </p>

                                        <p className='text-cyan-300'>
                                            {issue.suggestedValue}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-slate-500 uppercase'>
                                            Reason
                                        </p>

                                        <p className='text-slate-300'>
                                            {issue.reason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

function Card({ title, value, color }) {
    return (
        <div className='rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl'>
            <p className='text-xs tracking-[0.2em] text-slate-500 uppercase'>
                {title}
            </p>

            <p className={`mt-3 text-4xl font-black ${color}`}>{value}</p>
        </div>
    );
}

export default DatasetAudit;
