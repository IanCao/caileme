type SourceItem = {
  label: string;
  href: string;
};

interface EditorialTrustBlockProps {
  updatedAt: string;
  applicableScope: string;
  reviewedBy: string;
  reviewMethod: string;
  disclaimer: string;
  sources: SourceItem[];
}

export default function EditorialTrustBlock({
  updatedAt,
  applicableScope,
  reviewedBy,
  reviewMethod,
  disclaimer,
  sources,
}: EditorialTrustBlockProps) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold">信息说明与来源</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="rounded-xl bg-surface p-4">
          <div className="text-xs text-gray-400">最近更新</div>
          <div className="mt-2 font-medium text-gray-900">{updatedAt}</div>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <div className="text-xs text-gray-400">适用范围</div>
          <div className="mt-2 font-medium text-gray-900">{applicableScope}</div>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <div className="text-xs text-gray-400">内容整理</div>
          <div className="mt-2 font-medium text-gray-900">{reviewedBy}</div>
        </div>
        <div className="rounded-xl bg-surface p-4">
          <div className="text-xs text-gray-400">审核方式</div>
          <div className="mt-2 font-medium text-gray-900">{reviewMethod}</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-surface p-4">
        <div className="text-xs text-gray-400">主要来源</div>
        <div className="mt-3 flex flex-col gap-2">
          {sources.map((source) => (
            <a
              key={`${source.label}-${source.href}`}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline break-all"
            >
              {source.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
        <p className="text-xs leading-relaxed text-yellow-700">{disclaimer}</p>
      </div>
    </section>
  );
}
