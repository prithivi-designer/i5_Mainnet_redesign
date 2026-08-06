"use client";

import React, { useEffect } from "react";
import { SlidersHorizontal, Edit3, X, Shield, FileText, AlertCircle, MoreHorizontal } from "lucide-react";
import styles from "./PipelineArchitectureModal.module.css";

interface PipelineArchitectureModalProps {
  onClose: () => void;
  onEdit?: () => void;
}

export default function PipelineArchitectureModal({ onClose, onEdit }: PipelineArchitectureModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className={styles.topBar}>
          <div className={styles.titleGroup}>
            <span className={styles.titleIcon}>
              <SlidersHorizontal size={18} />
            </span>
            <span className={styles.titleText}>Active Pipeline Architecture</span>
          </div>

          <div className={styles.topActions}>
            <button className={styles.editBtn} onClick={onEdit}>
              <Edit3 size={13} />
              Edit Pipeline
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {/* Section 1: Ingress */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>1. INGRESS (ENTRY POINT)</div>
            <div className={styles.panelCard}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Endpoint:</span>
                <div className={styles.rowValueGroup}>
                  <span className={styles.monoText}>/v1/chat/completions</span>
                  <span className={styles.badge}>POST</span>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Auth Protocol:</span>
                <div className={styles.rowValueGroup}>
                  <span className={styles.badge}>Bearer Token (Strict)</span>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Rate Limit:</span>
                <div className={styles.rowValueGroup}>
                  <span className={styles.monoText} style={{ color: "#9ca3af" }}>req/min per IP</span>
                  <span className={styles.badge}>100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pre-Processing */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>2. PRE-PROCESSING (MIDDLEWARE)</div>
            <div className={styles.middlewareGrid}>
              {/* Card 1 */}
              <div className={styles.middlewareCard}>
                <div className={styles.middlewareHeader}>
                  <Shield size={14} className={styles.middlewareIcon} />
                  PII Redact
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Mode:</span>
                  <span className={styles.badge}>MASK</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Engine:</span>
                  <span className={styles.badge}>NER</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className={styles.middlewareCard}>
                <div className={styles.middlewareHeader}>
                  <FileText size={14} className={styles.middlewareIcon} />
                  Injection
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Heuristic:</span>
                  <span className={styles.badge}>ON</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Vector:</span>
                  <span className={styles.badge}>STRICT</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.middlewareCard}>
                <div className={styles.middlewareHeader}>
                  <AlertCircle size={14} className={styles.middlewareIcon} />
                  Toxicity Class.
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Threshold:</span>
                  <span className={styles.badge}>0.85</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Action:</span>
                  <span className={styles.badge}>DROP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Dynamic Router */}
          <div className={styles.section}>
            <div className={styles.sectionTitle}>3. DYNAMIC ROUTER (DECISION MATRIX)</div>
            <div className={styles.panelCard}>
              <div className={styles.routerHeader}>
                <div className={styles.ruleTagGroup}>
                  <span>Rule 01</span>
                  <span className={styles.dotSep}>•</span>
                  <span className={styles.badgeHigh}>High</span>
                </div>
                <button className={styles.moreBtn} aria-label="Rule options">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className={styles.conditionBox}>
                <span>IF</span>
                <span>[</span>
                <span className={styles.pillTag}>Intent</span>
                <span>]</span>
                <span>==</span>
                <span>[</span>
                <span className={styles.pillTag}>Billing</span>
                <span>,</span>
                <span className={styles.pillTag}>Refund</span>
                <span>]</span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Route to:</span>
                <span className={styles.badge}>GPT-4o</span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Temp:</span>
                <span className={styles.badge}>0.2</span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowLabel}>Max Tokens:</span>
                <span className={styles.badge}>1024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
