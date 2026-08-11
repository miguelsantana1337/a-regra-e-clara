"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AREAS } from "@/content/diagnostic/areas";
import { ANSWER_OPTIONS, QUESTIONS } from "@/content/diagnostic/questions";
import { captureUtm, getSessionId, trackEvent } from "@/lib/analytics/client";
import type { Answer, UtmData } from "@/types/diagnostic";

type QuizPhase = "questions" | "lead";

type Draft = {
  answers: Record<string, number>;
  questionIndex: number;
  utm: UtmData;
};

const DRAFT_KEY = "arc_diagnostic_draft_v1";

function saveDraft(draft: Draft) {
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function readDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function DiagnosticQuiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<QuizPhase>("questions");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [utm, setUtm] = useState<UtmData>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const currentUtm = captureUtm();
      const draft = readDraft();
      if (draft && Object.keys(draft.answers).length < QUESTIONS.length) {
        setAnswers(draft.answers);
        setQuestionIndex(Math.min(draft.questionIndex, QUESTIONS.length - 1));
        setUtm({ ...draft.utm, ...currentUtm });
      } else {
        setUtm(currentUtm);
      }
    });
    getSessionId();
    trackEvent("diagnostic_started", captureUtm());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const question = QUESTIONS[questionIndex];
  const progress = phase === "lead" ? 100 : ((questionIndex + 1) / QUESTIONS.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const selectedAnswer = question ? answers[question.id] : undefined;
  const areaPosition = useMemo(
    () => QUESTIONS.filter((item) => item.area === question?.area).findIndex((item) => item.id === question?.id) + 1,
    [question],
  );

  function answerQuestion(value: number) {
    if (!question) return;
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    trackEvent("diagnostic_question_answered", {
      question: question.id,
      area: question.area,
      position: question.order,
    });

    if (questionIndex === QUESTIONS.length - 1) {
      saveDraft({ answers: nextAnswers, questionIndex, utm });
      window.setTimeout(() => {
        setPhase("lead");
        trackEvent("diagnostic_completed", { answered_questions: QUESTIONS.length });
      }, 180);
      return;
    }

    const nextIndex = questionIndex + 1;
    saveDraft({ answers: nextAnswers, questionIndex: nextIndex, utm });
    window.setTimeout(() => setQuestionIndex(nextIndex), 160);
  }

  function goBack() {
    setError("");
    if (phase === "lead") {
      setPhase("questions");
      setQuestionIndex(QUESTIONS.length - 1);
      return;
    }
    if (questionIndex === 0) {
      router.push("/diagnostico");
      return;
    }
    setQuestionIndex((current) => Math.max(0, current - 1));
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (answeredCount !== QUESTIONS.length) {
      setError("Volte e responda todas as perguntas antes de continuar.");
      return;
    }

    setSubmitting(true);
    const answerList: Answer[] = QUESTIONS.map((item) => ({
      questionId: item.id,
      value: answers[item.id],
    }));

    try {
      const response = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          lead: { name, email, whatsapp, consent },
          answers: answerList,
          utm,
        }),
      });
      const data = (await response.json()) as { id?: string; error?: string };

      if (!response.ok || !data.id) {
        throw new Error(data.error ?? "Não foi possível gerar seu resultado.");
      }

      window.localStorage.removeItem(DRAFT_KEY);
      router.push(`/diagnostico/resultado/${data.id}`);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível gerar seu resultado. Tente novamente.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="quiz-shell">
      <div className="quiz-topbar">
        <button className="back-button" type="button" onClick={goBack} aria-label="Voltar">
          ← <span>VOLTAR</span>
        </button>
        <div className="quiz-brand">A REGRA É CLARA</div>
        <span className="quiz-counter">
          {phase === "questions" ? `${String(questionIndex + 1).padStart(2, "0")} / 25` : "PRONTO"}
        </span>
      </div>

      <div className="progress-track" aria-label={`Progresso: ${Math.round(progress)}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      {phase === "questions" && question ? (
        <section className="question-stage" key={question.id}>
          <div className="question-context">
            <p className="eyebrow"><span /> {AREAS[question.area].name.toUpperCase()}</p>
            <p>PERGUNTA {areaPosition} DE 5 NESTA ÁREA</p>
          </div>
          <h1>{question.text}</h1>
          <p className="question-instruction">Pense na sua rotina das últimas quatro semanas.</p>

          <div className="answer-list" role="radiogroup" aria-label="Escolha uma resposta">
            {ANSWER_OPTIONS.map((option, index) => (
              <button
                key={option.value}
                className={`answer-option${selectedAnswer === option.value ? " is-selected" : ""}`}
                type="button"
                role="radio"
                aria-checked={selectedAnswer === option.value}
                onClick={() => answerQuestion(option.value)}
              >
                <span className="answer-option__key">{index + 1}</span>
                <span>{option.label}</span>
                <span className="answer-option__dot" aria-hidden="true" />
              </button>
            ))}
          </div>

          <p className="keyboard-hint">TOQUE EM UMA RESPOSTA PARA AVANÇAR</p>
        </section>
      ) : (
        <section className="lead-stage">
          <div className="lead-stage__signal"><span>25</span><small>/ 25</small></div>
          <div className="lead-stage__copy">
            <p className="eyebrow"><span /> DIAGNÓSTICO CONCLUÍDO</p>
            <h1>SEU RESULTADO ESTÁ PRONTO.</h1>
            <p>
              Falta só identificar para quem entregar a leitura das cinco áreas,
              sua prioridade e a regra indicada.
            </p>
          </div>

          <form className="lead-form" onSubmit={submitLead}>
            <label>
              <span>SEU NOME</span>
              <input
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como podemos chamar você?"
                minLength={2}
                maxLength={120}
                required
              />
            </label>
            <label>
              <span>WHATSAPP</span>
              <input
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="(11) 99999-9999"
                minLength={10}
                maxLength={32}
                required
              />
            </label>
            <label>
              <span>E-MAIL</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@email.com"
                maxLength={180}
                required
              />
            </label>
            <label className="consent-field">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span>
                Aceito receber conteúdos e comunicações de A Regra é Clara. Posso
                cancelar quando quiser.
              </span>
            </label>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <button className="primary-cta lead-submit" type="submit" disabled={submitting}>
              <span>{submitting ? "CALCULANDO..." : "VER MEU RESULTADO"}</span>
              <span aria-hidden="true">↗</span>
            </button>
            <p className="privacy-note">
              Suas respostas individuais não são armazenadas. Guardamos apenas as
              pontuações finais e os dados que você informou.
            </p>
          </form>
        </section>
      )}
    </main>
  );
}
