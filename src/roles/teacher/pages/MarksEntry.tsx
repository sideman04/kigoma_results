/**
 * Teacher — Marks entry workflow selector.
 * Step 1 of the marks entry workflow: choose year, exam, class, stream, subject.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { examinationService, subjectAssignmentService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ArrowUp, Clock, School, BookOpen } from 'lucide-react';

const STEPS = [
  { key: 'year', label: 'Academic year' },
  { key: 'exam', label: 'Examination' },
  { key: 'class', label: 'Class' },
  { key: 'stream', label: 'Stream' },
  { key: 'subject', label: 'Subject' },
];

export default function MarksEntry() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{
    academicYearId: string; examinationId: string; classId: string; streamId: string; subjectId: string;
  }>({ academicYearId: '', examinationId: '', classId: '', streamId: '', subjectId: '' });
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    examinationService.list({ pageSize: 100 }).then((res) => setExams(res.data)).catch(() => {});
  }, []);

  const current = STEPS[step];
  const disabled = () => {
    switch (current.key) {
      case 'year': return !form.academicYearId;
      case 'exam': return !form.examinationId;
      case 'class': return !form.classId;
      case 'stream': return !form.streamId;
      case 'subject': return !form.subjectId;
    }
    return true;
  };

  const goNext = () => {
    if (disabled()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      navigate(`/teacher/marks-entry/session-new`);
    }
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const classes = [
    { id: 'class-f4', name: 'Form 4', code: 'F4' },
    { id: 'class-f6', name: 'Form 6', code: 'F6' },
  ];
  const streams = [
    { id: 'stream-a', name: 'Stream A', code: 'F4A' },
    { id: 'stream-b', name: 'Stream B', code: 'F4B' },
  ];

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks entry"
        description="Enter marks for your assigned classes and subjects. Select the examination context below."
      />

      {/* Stepper */}
      <div className="flex items-center gap-1 mb-6 border-b border-neutral-200 pb-3">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
              i < step ? 'bg-green-700 text-white' : i === step ? 'bg-green-700 text-white ring-2 ring-green-700/30' : 'bg-neutral-200 text-neutral-500'
            }`}>{i + 1}</span>
            {i < STEPS.length - 1 && <ArrowRight className="h-3 w-3 text-neutral-400" />}
            <span className={`text-xs font-medium ${i <= step ? 'text-neutral-900' : 'text-neutral-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{current.label}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {current.key === 'year' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Select the academic year for marks entry.</p>
              <Select value={form.academicYearId} onChange={(e) => setForm({ ...form, academicYearId: e.target.value })} className="w-72">
                <Option value="">Select an academic year</Option>
                <Option value="year-2025">Academic Year 2025</Option>
                <Option value="year-2024">Academic Year 2024</Option>
              </Select>
            </div>
          )}
          {current.key === 'exam' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Select the examination you are entering marks for.</p>
              <div className="overflow-auto rounded-lg border border-neutral-200 bg-white max-h-64">
                <table className="table w-full text-sm">
                  <thead>
                    <tr>
                      <th className="th">Code</th>
                      <th className="th">Name</th>
                      <th className="th">Type</th>
                      <th className="th">Status</th>
                      <th className="th w-32">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.length === 0 ? (
                      <tr><td colSpan="5" className="td h-20 text-center text-neutral-500">No examinations available.</td></tr>
                    ) : (
                      exams.map((e) => (
                        <tr key={e.id} className="cursor-pointer hover:bg-green-50 transition-colors" onClick={() => setForm({ ...form, examinationId: e.id })}>
                          <td className="td font-mono text-xs">{e.code}</td>
                          <td className="td">{e.name}</td>
                          <td className="td text-sm text-neutral-600">{e.type.toUpperCase()}</td>
                          <td className="td"><Badge variant={e.status === 'open' ? 'success' : 'neutral'} size="sm">{e.status}</Badge></td>
                          <td className="td text-right">
                            {form.examinationId === e.id ? <CheckIcon /> : <div className="w-4 h-4 rounded-full border border-neutral-300" />}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {current.key === 'class' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Select your assigned class.</p>
              <div className="grid grid-cols-2 gap-3">
                {classes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setForm({ ...form, classId: c.id, streamId: '' })}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      form.classId === c.id ? 'bg-green-50 border-green-700' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-neutral-900">{c.name}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{c.code}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      {form.classId === c.id ? <CheckIcon /> : <div className="w-3 h-3 rounded-full border border-neutral-300" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {current.key === 'stream' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Select the stream (where applicable).</p>
              <div className="grid grid-cols-2 gap-3">
                {streams.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setForm({ ...form, streamId: s.id })}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      form.streamId === s.id ? 'bg-green-50 border-green-700' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-neutral-900">{s.name}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{s.code}</div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      {form.streamId === s.id ? <CheckIcon /> : <div className="w-3 h-3 rounded-full border border-neutral-300" />}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-500">Leave unselected if the class has no streams.</p>
            </div>
          )}
          {current.key === 'subject' && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600">Select your assigned subject.</p>
              <div className="overflow-auto rounded-lg border border-neutral-200 bg-white max-h-64">
                <table className="table w-full text-sm">
                  <thead>
                    <tr>
                      <th className="th">Code</th>
                      <th className="th">Subject</th>
                      <th className="th">Rule</th>
                      <th className="th w-32">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.length === 0 ? (
                      <tr><td colSpan="4" className="td h-20 text-center text-neutral-500">No subjects assigned.</td></tr>
                    ) : (
                      subjects.map((s) => (
                        <tr key={s.id} className="cursor-pointer hover:bg-green-50 transition-colors" onClick={() => setForm({ ...form, subjectId: s.id })}>
                          <td className="td font-mono text-xs">{s.subjectCode || s.code}</td>
                          <td className="td">{s.subjectName || s.name}</td>
                          <td className="td"><Badge variant={s.compulsory ? 'success' : 'neutral'} size="sm">{s.compulsory ? 'Compulsory' : 'Optional'}</Badge></td>
                          <td className="td text-right">
                            {form.subjectId === s.id ? <CheckIcon /> : <div className="w-4 h-4 rounded-full border border-neutral-300" />}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2">Subjects are filtered to your assignments for the selected class/stream.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="ghost" size="sm" onClick={goPrev}>Back</Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button variant="primary" size="sm" onClick={goNext} disabled={disabled()}>Continue</Button>
          ) : (
            <Button variant="primary" size="sm" onClick={goNext} disabled={disabled()}>Open marks entry</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>; }
