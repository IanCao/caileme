"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CommunityPost } from "@/data/communityData";
import { likePost, trackView } from "@/lib/api";
import { AdSlot } from "@/components/AdSlot";

type RelatedPost = Pick<CommunityPost, "id" | "title" | "summary" | "category" | "date">;

function getSafeHref(rawHref: string): string | null {
  const href = rawHref.trim();

  if (!href) return null;
  if (href.startsWith("/")) return href;

  try {
    const url = new URL(href, "https://caileme.team");
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    return href.startsWith("http") ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${match.index}`}>{match[1]}</strong>
      );
    } else {
      const label = match[2] || match[0];
      const href = getSafeHref(match[3] || "");

      nodes.push(
        href ? (
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-accent hover:underline"
          >
            {label}
          </a>
        ) : (
          <Fragment key={`${keyPrefix}-text-${match.index}`}>{label}</Fragment>
        )
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderContent(markdown: string) {
  return markdown.split("\n").map((line, index, lines) => {
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="mb-4 mt-6 text-2xl font-bold">
          {line.slice(2)}
        </h1>
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="mb-3 mt-6 text-xl font-bold">
          {line.slice(3)}
        </h2>
      );
    }

    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="mb-2 mt-4 text-lg font-semibold">
          {line.slice(4)}
        </h3>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="my-3 border-l-4 border-accent pl-4 italic text-gray-600"
        >
          {renderInline(line.slice(2), `quote-${index}`)}
        </blockquote>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <p key={index} className="my-1.5 pl-4 leading-relaxed text-gray-700">
          {"• "}
          {renderInline(line.slice(2), `bullet-${index}`)}
        </p>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      return (
        <p key={index} className="my-1.5 pl-4 leading-relaxed text-gray-700">
          {renderInline(line, `ordered-${index}`)}
        </p>
      );
    }

    if (line.startsWith("|")) {
      if (line.includes("---")) return null;
      const nextLine = lines[index + 1] || "";
      const cells = line.split("|").filter((cell) => cell.trim());
      const isHeader = nextLine.includes("---");

      return (
        <div
          key={index}
          className={`grid gap-0 ${isHeader ? "bg-gray-50 font-semibold" : ""}`}
          style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
        >
          {cells.map((cell, cellIndex) => (
            <span
              key={`${index}-${cellIndex}`}
              className="border border-gray-100 px-3 py-1.5 text-sm"
            >
              {cell.trim()}
            </span>
          ))}
        </div>
      );
    }

    if (!line.trim()) {
      return <div key={index} className="h-2" />;
    }

    return (
      <p key={index} className="my-1.5 leading-relaxed text-gray-700">
        {renderInline(line, `paragraph-${index}`)}
      </p>
    );
  });
}

export default function PostDetailClient({
  params,
  post,
  relatedPosts,
}: {
  params: { id: string };
  post: CommunityPost | null;
  relatedPosts: RelatedPost[];
}) {
  const postId = params.id;
  const [likes, setLikes] = useState(post?.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentNickname, setCommentNickname] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const viewTracked = useRef(false);

  useEffect(() => {
    if (!post || viewTracked.current) return;

    viewTracked.current = true;
    trackView(post.id);
  }, [post]);

  useEffect(() => {
    if (!post) return;

    const stored = localStorage.getItem(`liked_${post.id}`);
    if (stored === "1") {
      setLiked(true);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">帖子不存在</h1>
          <Link href="/community" className="text-accent hover:underline">
            返回保护站信息
          </Link>
        </div>
      </div>
    );
  }

  const safeSourceHref = post.sourceUrl ? getSafeHref(post.sourceUrl) : null;

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-20">
        <Link
          href="/community"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-black"
        >
          ← 返回保护站信息
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">{post.avatar}</span>
            <div>
              <span className="font-medium">{post.nickname}</span>
              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
                {post.city ? <span className="text-xs text-gray-400">{post.city}</span> : null}
              </div>
            </div>
          </div>

          <header className="mb-6">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
            <p className="mt-3 text-base text-gray-500 md:text-lg">{post.summary}</p>
          </header>

          {(post.source || safeSourceHref) ? (
            <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-900">信息来源</h2>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                {post.source ? <p>来源：{post.source}</p> : null}
                {safeSourceHref ? (
                  <a
                    href={safeSourceHref}
                    target={safeSourceHref.startsWith("http") ? "_blank" : undefined}
                    rel={safeSourceHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="break-all text-accent hover:underline"
                  >
                    查看原始链接
                  </a>
                ) : null}
              </div>
            </section>
          ) : null}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            {renderContent(post.content)}
          </div>

          <AdSlot variant="inArticle" className="mt-6" />

          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-900">信息说明</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">最近更新</div>
                <div className="mt-1 font-medium text-gray-900">{post.date}</div>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">内容类型</div>
                <div className="mt-1 font-medium text-gray-900">{post.category}</div>
              </div>
            </div>
            <p className="mt-4 rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-xs leading-relaxed text-yellow-700">
              说明：保护站信息中的文章用于帮助你快速理解互联网裁员、再就业和劳动权益相关信息。其中带来源链接的内容优先依据公开信息整理；涉及个人情况时，请再结合本地政策和你的材料判断。
            </p>
          </section>

          <div className="mt-6 flex items-center gap-4">
            <motion.button
              onClick={async () => {
                if (liked) return;

                setLiked(true);
                setLikes((value) => value + 1);
                setLikeAnimating(true);
                localStorage.setItem(`liked_${post.id}`, "1");
                setTimeout(() => setLikeAnimating(false), 300);
                await likePost(post.id);
              }}
              animate={likeAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                liked
                  ? "cursor-default bg-blue-100 text-blue-600"
                  : "cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              disabled={liked}
            >
              👍 {likes} 人觉得有用
            </motion.button>
          </div>

          <section className="mt-8">
            <h2 className="mb-4 text-lg font-bold">评论 ({post.comments.length})</h2>
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div
                  key={`${comment.nickname}-${comment.date}-${index}`}
                  className="rounded-xl border border-gray-100 bg-white p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{comment.avatar}</span>
                      <span className="text-sm font-medium">{comment.nickname}</span>
                    </div>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4">
              {commentSubmitted ? (
                <div className="py-4 text-center">
                  <p className="text-sm font-medium text-success">评论提交成功</p>
                  <p className="mt-1 text-xs text-amber-600">审核通过后会展示在评论区。</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={commentNickname}
                    onChange={(event) => setCommentNickname(event.target.value)}
                    placeholder="昵称，可选，默认匿名"
                    className="mb-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="写下你的评论..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <button
                    onClick={async () => {
                      if (!commentText.trim()) return;

                      setCommentSubmitting(true);
                      try {
                        const { submitComment } = await import("@/lib/api");
                        await submitComment({
                          postId,
                          nickname: commentNickname || "匿名打工人",
                          content: commentText,
                        });
                      } catch {}

                      setCommentSubmitting(false);
                      setCommentSubmitted(true);
                    }}
                    disabled={!commentText.trim() || commentSubmitting}
                    className="mt-2 w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                  >
                    {commentSubmitting ? "提交中..." : "发表评论"}
                  </button>
                </>
              )}
            </div>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold">相关文章</h2>
                <Link href="/community" className="text-sm text-accent hover:underline">
                  查看更多 →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/community/post/${item.id}`}
                    className="block rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
                        {item.category}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-500">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <AdSlot variant="multiplex" className="mt-8" />
        </motion.article>
      </div>
    </div>
  );
}
