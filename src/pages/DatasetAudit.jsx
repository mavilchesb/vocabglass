import { useMemo, useState } from 'react';
import vocabularyData from '../data/vocabulary.json';
import auditVocabulary from '../utils/auditVocabulary';
import getDatasetInsights from '../utils/getDatasetInsights';

function DatasetAudit({ onBack }) {
    const audit = useMemo(() => auditVocabulary(vocabularyData.vocabulary), []);

    const insights = useMemo(
        () => getDatasetInsights(vocabularyData.vocabulary),
        [],
    );

    const [filter, setFilter] = useState('all');
    const [fieldFilter, setFieldFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const issues = useMemo(() => {
        return [...audit.errors, ...audit.warnings, ...audit.infos];
    }, [audit]);

    const availableFields = useMemo(() => {
        return ['all', ...[...new Set(issues.map((i) => i.field))].sort()];
    }, [issues]);

    const filteredIssues = useMemo(() => {
        let result = issues;

        if (filter !== 'all') {
            result = result.filter((issue) => issue.severity === filter);
        }

        if (fieldFilter !== 'all') {
            result = result.filter((issue) => issue.field === fieldFilter);
        }

        if (search.trim()) {
            result = result.filter((issue) =>
                issue.word.toLowerCase().includes(search.toLowerCase()),
            );
        }

        return result;
    }, [issues, filter, fieldFilter, search]);

    const handleCopyId = (id) => {
        navigator.clipboard.writeText(String(id));
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

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
                <div className='relative mb-8 flex items-center justify-center'>
                    <button
                        onClick={onBack}
                        className='absolute left-0 text-sm tracking-[0.15em] text-slate-500 uppercase transition-colors hover:text-white'
                    >
                        ← Back
                    </button>

                    <h1 className='text-4xl font-black text-white'>
                        Dataset Audit
                    </h1>
                </div>

                <div className='mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5'>
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
                    {/* Envolvemos la quinta tarjeta para que ocupe las 2 columnas en móvil y no deje un hueco vacío */}
                    <div className='col-span-2 sm:col-span-1'>
                        <Card
                            title='Infos'
                            value={audit.infos?.length || 0}
                            color='text-cyan-400'
                        />
                    </div>
                </div>

                <div className='mb-8 rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl'>
                    <h2 className='relative mb-6 flex items-center justify-center text-2xl font-bold text-white'>
                        ⚙️ Dataset Insights
                    </h2>

                    <CollapsibleSection title='📝 Examples Summary'>
                        <div className='flex flex-wrap items-center gap-3'>
                            <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-xl'>
                                <p className='text-slate-300'>
                                    <span className='mr-1.5 font-semibold text-white'>
                                        Shortest:
                                    </span>
                                    {insights.shortestExample}
                                </p>
                            </div>

                            <div className='rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-xl'>
                                <p className='text-slate-300'>
                                    <span className='mr-1.5 font-semibold text-white'>
                                        Longest:
                                    </span>
                                    {insights.longestExample}
                                </p>
                            </div>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title='📊 Coverage Analysis'>
                        <div className='space-y-3 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0'>
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
                                                  : 'border-green-600/20 bg-green-600/[0.04]'
                                        }`}
                                    >
                                        <div className='mb-4 flex items-center justify-between'>
                                            <h4 className='font-semibold text-white capitalize'>
                                                {item.category}
                                            </h4>
                                            <p className='font-semibold text-slate-400'>
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

                                                    let barColor = 'bg-red-800';

                                                    if (percentage >= 80) {
                                                        barColor =
                                                            'bg-green-600';
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
                    </CollapsibleSection>

                    <CollapsibleSection title='🔤 Word Type Coverage'>
                        <div className='space-y-3 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0'>
                            {insights.wordTypeCoverageAnalysis.map((item) => {
                                let barColor = 'bg-red-800';

                                if (item.percentage >= 80) {
                                    barColor = 'bg-green-600';
                                } else if (item.percentage >= 45) {
                                    barColor = 'bg-yellow-400';
                                }

                                return (
                                    <div
                                        key={item.type}
                                        className='space-y-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5'
                                    >
                                        <div className='flex justify-between text-sm'>
                                            <span className='font-semibold text-white capitalize'>
                                                {item.type}
                                            </span>
                                            <span className='text-white'>
                                                {item.count} / {item.target}
                                            </span>
                                        </div>
                                        <div className='h-2 overflow-hidden rounded-full bg-white/10'>
                                            <div
                                                className={`h-full rounded-full transition-all ${barColor}`}
                                                style={{
                                                    width: `${item.percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title='📚 Pedagogical Insights'>
                        <div className='flex flex-wrap gap-3 space-y-3'>
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
                    </CollapsibleSection>

                    <CollapsibleSection title='🎭 False Friends'>
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
                    </CollapsibleSection>

                    <div className='mt-6 border-t border-white/[0.08] pt-5'>
                        <h2 className='relative flex items-center justify-center py-3 text-2xl font-bold text-white'>
                            🔍 Issues Found
                        </h2>

                        <div className='mb-8 flex flex-col gap-4 pt-6'>
                            <div className='flex flex-wrap items-center gap-3'>
                                <span className='text-xs tracking-[0.15em] text-slate-500 uppercase'>
                                    Severity
                                </span>
                                {[
                                    {
                                        key: 'all',
                                        label: 'All',
                                        active: 'bg-cyan-400/20 text-cyan-300',
                                    },
                                    {
                                        key: 'critical',
                                        label: 'Critical',
                                        active: 'bg-red-500/20 text-red-300',
                                    },
                                    {
                                        key: 'warning',
                                        label: 'Warning',
                                        active: 'bg-yellow-500/20 text-yellow-300',
                                    },
                                    {
                                        key: 'info',
                                        label: 'Info',
                                        active: 'bg-cyan-500/20 text-cyan-300',
                                    },
                                ].map(({ key, label, active }) => (
                                    <button
                                        key={key}
                                        onClick={() => setFilter(key)}
                                        className={`cursor-pointer rounded-xl px-4 py-2 transition-all ${filter === key ? active : 'bg-white/[0.03] text-slate-400 hover:text-white'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className='flex flex-wrap items-center gap-3'>
                                <span className='text-xs tracking-[0.15em] text-slate-500 uppercase'>
                                    Field
                                </span>
                                {availableFields.map((field) => (
                                    <button
                                        key={field}
                                        onClick={() => setFieldFilter(field)}
                                        className={`cursor-pointer rounded-xl px-4 py-2 capitalize transition-all ${
                                            fieldFilter === field
                                                ? 'bg-violet-500/20 text-violet-300'
                                                : 'bg-white/[0.03] text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {field}
                                    </button>
                                ))}
                            </div>

                            <div className='flex items-center justify-between'>
                                <p className='text-sm text-slate-500'>
                                    Showing {filteredIssues.length} issue(s)
                                </p>
                                <input
                                    type='text'
                                    placeholder='Search word...'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-white outline-none'
                                />
                            </div>
                        </div>

                        <div>
                            {issues.length === 0 ? (
                                <div className='rounded-[22px] border border-emerald-500/20 bg-emerald-500/[0.06] p-6'>
                                    <p className='text-emerald-300'>
                                        ✅ Dataset is clean. No issues detected.
                                    </p>
                                </div>
                            ) : filteredIssues.length === 0 ? (
                                <div className='rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-6'>
                                    <p className='text-slate-400'>
                                        No issues match the current filters.
                                    </p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                    {filteredIssues.map((issue, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-[22px] border p-6 backdrop-blur-xl transition-all ${
                                                issue.severity === 'critical'
                                                    ? 'border-red-400/20 bg-red-500/[0.04]'
                                                    : issue.severity ===
                                                        'warning'
                                                      ? 'border-yellow-400/20 bg-yellow-500/[0.04]'
                                                      : 'border-cyan-400/20 bg-cyan-500/[0.04]'
                                            }`}
                                        >
                                            <div className='mb-5 flex items-center justify-between border-b border-white/[0.06] pb-3'>
                                                <h3
                                                    className={`flex items-center text-lg font-bold ${
                                                        issue.severity ===
                                                        'critical'
                                                            ? 'text-red-300'
                                                            : issue.severity ===
                                                                'warning'
                                                              ? 'text-yellow-300'
                                                              : 'text-cyan-300'
                                                    }`}
                                                >
                                                    <span className='mr-2'>
                                                        {issue.severity ===
                                                        'critical'
                                                            ? '❌'
                                                            : issue.severity ===
                                                                'warning'
                                                              ? '⚠️'
                                                              : 'ℹ️'}
                                                    </span>
                                                    {issue.word}
                                                </h3>

                                                <span
                                                    onClick={() =>
                                                        handleCopyId(issue.id)
                                                    }
                                                    title='Click to copy ID'
                                                    className={`cursor-pointer rounded border px-2 py-0.5 font-mono text-xs transition-all ${
                                                        copiedId === issue.id
                                                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                                            : 'border-white/[0.04] bg-white/[0.02] text-slate-500 hover:border-white/10 hover:bg-white/[0.06] hover:text-slate-300'
                                                    }`}
                                                >
                                                    {copiedId === issue.id
                                                        ? '✓ Copied'
                                                        : `ID #${issue.id}`}
                                                </span>
                                            </div>

                                            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                                                <div className='space-y-4'>
                                                    <div>
                                                        <span className='mb-1 block text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase'>
                                                            Field
                                                        </span>
                                                        <p className='text-sm font-medium text-slate-300'>
                                                            {issue.field}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className='mb-1 block text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase'>
                                                            Suggested Fix
                                                        </span>
                                                        <p className='text-sm font-semibold text-cyan-300'>
                                                            {
                                                                issue.suggestedValue
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='space-y-4 lg:border-l lg:border-white/[0.08] lg:pl-6'>
                                                    <div>
                                                        <span className='mb-1 block text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase'>
                                                            Current Value
                                                        </span>
                                                        <p className='text-sm font-semibold text-white'>
                                                            {issue.currentValue}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className='mb-1 block text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase'>
                                                            Reason
                                                        </span>
                                                        <p className='text-sm leading-relaxed text-slate-400 italic'>
                                                            "{issue.reason}"
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function CollapsibleSection({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className='mt-6 border-t border-white/[0.08] pt-5'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex w-full cursor-pointer items-center justify-between'
            >
                <h3 className='text-lg font-medium text-cyan-300'>{title}</h3>
                <span
                    className={`text-slate-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                >
                    ▾
                </span>
            </button>

            {isOpen && <div className='mt-6'>{children}</div>}
        </div>
    );
}

function Card({ title, value, color }) {
    return (
        <div className='flex flex-col items-center rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-6 text-center backdrop-blur-xl'>
            <p className='text-xs tracking-[0.2em] text-slate-500 uppercase'>
                {title}
            </p>
            <p className={`mt-3 text-4xl font-black ${color}`}>{value}</p>
        </div>
    );
}

export default DatasetAudit;
