/**
 * 分享链接生成和解析工具
 * 使用URL hash加密存储数据，保护隐私（不存储到服务器）
 */

// 计算结果摘要接口
export interface CalculationSummary {
  type: 'severance' | 'unemployment';
  compensation: number;
  months: number;
  cityName: string;
  recommended: string;
  calculatedAt: string;
  extras?: {
    annualLeave?: number;
    tax?: number;
  };
}

/**
 * 生成分享链接
 * @param summary 计算结果摘要
 * @returns 完整的分享URL
 */
export function generateShareLink(summary: CalculationSummary): string {
  try {
    // Base64编码数据
    const encoded = btoa(JSON.stringify(summary));
    
    // 使用URL hash，不存储到服务器
    const baseUrl = window.location.origin;
    return `${baseUrl}/share?data=${encoded}`;
  } catch (error) {
    console.error('Failed to generate share link:', error);
    throw new Error('生成分享链接失败');
  }
}

/**
 * 解析分享链接
 * @param encodedData URL参数中的编码数据
 * @returns 解析后的计算结果摘要，或null
 */
export function parseShareLink(encodedData: string): CalculationSummary | null {
  try {
    // Base64解码
    const decoded = atob(encodedData);
    const summary = JSON.parse(decoded) as CalculationSummary;
    
    // 验证数据格式
    if (!summary.type || !summary.compensation || !summary.cityName) {
      throw new Error('Invalid data format');
    }
    
    return summary;
  } catch (error) {
    console.error('Failed to parse share link:', error);
    return null;
  }
}

/**
 * 从URL中提取分享数据
 * @returns 解析后的计算结果摘要，或null
 */
export function getShareDataFromUrl(): CalculationSummary | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    
    if (!data) return null;
    
    return parseShareLink(data);
  } catch (error) {
    console.error('Failed to get share data from URL:', error);
    return null;
  }
}

/**
 * 复制链接到剪贴板
 * @param link 要复制的链接
 * @returns Promise<boolean> 是否成功
 */
export async function copyLinkToClipboard(link: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(link);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        throw err;
      }
    }
  } catch (error) {
    console.error('Failed to copy link:', error);
    return false;
  }
}

/**
 * 格式化金额显示
 * @param amount 金额
 * @returns 格式化后的字符串
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
