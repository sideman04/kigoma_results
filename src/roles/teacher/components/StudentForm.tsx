/**
 * Reusable student information form for the Teacher workspace.
 * Handles personal details, registration numbers, class/stream placement and
 * academic status with inline validation feedback.
 */

import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Option, Select } from '../../shared/components/ui';
import { classService, streamService } from '../../shared/services/api';
import type { Gender, Student } from '../../shared/types';

export interface StudentFormValues {
  name: string;
  gender: Gender;
  dateOfBirth: string;
  admissionNo: string;
  regNo: string;
  classId: string;
  streamId: string;
  educationLevel: 'o_level' | 'a_level';
  combination: string;
  status: Student['status'];
}

const EMPTY: StudentFormValues = {
  name: '',
  gender: 'F',
  dateOfBirth: '',
  admissionNo: '',
  regNo: '',
  classId: '',
  streamId: '',
  educationLevel: 'o_level',
  combination: '',
  status: 'active',
};

export function studentToForm(student: Student): StudentFormValues {
  return {
    name: student.name,
    gender: student.gender,
    dateOfBirth: student.dateOfBirth ?? '',
    admissionNo: student.admissionNo ?? '',
    regNo: student.regNo ?? '',
    classId: student.classId ?? '',
    streamId: student.streamId ?? '',
    educationLevel: student.educationLevel ?? 'o_level',
    combination: student.combination ?? '',
    status: student.status,
  };
}

export function StudentForm({
  initial,
  submitLabel = 'Save student',
  busy = false,
  onSubmit,
  onCancel,
}: {
  initial?: Student;
  submitLabel?: string;
  busy?: boolean;
  onSubmit: (values: StudentFormValues & { className?: string; streamName?: string }) => void | Promise<void>;
  onCancel?: () => void;
}) {
  const [values, setValues] = useState<StudentFormValues>(initial ? studentToForm(initial) : EMPTY);
  const [classes, setClasses] = useState<Array<{ id: string; name: string }>>([]);
  const [streams, setStreams] = useState<Array<{ id: string; name: string; classId: string }>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    classService.list({ pageSize: 50 }).then((res) => setClasses(res.data));
    streamService.list({ pageSize: 50 }).then((res) => setStreams(res.data));
  }, []);

  useEffect(() => {
    if (initial) setValues(studentToForm(initial));
  }, [initial]);

  const classStreams = useMemo(
    () => streams.filter((stream) => !values.classId || stream.classId === values.classId),
    [streams, values.classId]
  );

  const update = (patch: Partial<StudentFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim() || values.name.trim().length < 3) next.name = 'Enter the student’s full name.';
    if (!values.admissionNo.trim()) next.admissionNo = 'An admission number is required.';
    if (!values.classId) next.classId = 'Assign the student to a class.';
    if (!values.dateOfBirth) next.dateOfBirth = 'Enter the date of birth.';
    if (values.regNo && !/^[A-Za-z0-9/.\-]+$/.test(values.regNo.trim())) next.regNo = 'Use letters, numbers, / or -.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const selectedClass = classes.find((item) => item.id === values.classId);
    const selectedStream = streams.find((item) => item.id === values.streamId);
    await onSubmit({
      ...values,
      name: values.name.trim(),
      admissionNo: values.admissionNo.trim(),
      regNo: values.regNo.trim(),
      className: selectedClass?.name,
      streamName: selectedStream?.name,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <div>
        <h3 className="text-sm font-semibold text-neutral-900">Personal information</h3>
        <p className="text-xs text-neutral-500">Identity and contact details for the student record.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full name" value={values.name} onChange={(e) => update({ name: e.target.value })} error={errors.name} placeholder="e.g. Asha Ntibuka" required />
        <Select label="Gender" value={values.gender} onChange={(e) => update({ gender: e.target.value as Gender })}>
          <Option value="F">Female</Option>
          <Option value="M">Male</Option>
        </Select>
        <Input label="Date of birth" type="date" value={values.dateOfBirth} onChange={(e) => update({ dateOfBirth: e.target.value })} error={errors.dateOfBirth} required />
        <Input label="Admission number" value={values.admissionNo} onChange={(e) => update({ admissionNo: e.target.value })} error={errors.admissionNo} placeholder="e.g. LV006" required />
        <Input label="Registration number" value={values.regNo} onChange={(e) => update({ regNo: e.target.value })} error={errors.regNo} placeholder="e.g. S0101/0006" helper="Can be assigned or updated later." />
        <Select label="Enrolment status" value={values.status} onChange={(e) => update({ status: e.target.value as Student['status'] })}>
          <Option value="active">Active</Option>
          <Option value="withdrawn">Withdrawn</Option>
          <Option value="transferred">Transferred</Option>
        </Select>
      </div>

      <div className="border-t border-neutral-100 pt-5">
        <h3 className="text-sm font-semibold text-neutral-900">Academic information</h3>
        <p className="text-xs text-neutral-500">Class placement and education level for the current academic year.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Class" value={values.classId} onChange={(e) => update({ classId: e.target.value, streamId: '', educationLevel: e.target.value === 'class-f5' || e.target.value === 'class-f6' ? 'a_level' : 'o_level' })} error={errors.classId} required>
          <Option value="">Select a class</Option>
          {classes.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
        <Select label="Stream" value={values.streamId} onChange={(e) => update({ streamId: e.target.value })} disabled={!values.classId}>
          <Option value="">No stream / not assigned</Option>
          {classStreams.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
        </Select>
        <Select label="Education level" value={values.educationLevel} onChange={(e) => update({ educationLevel: e.target.value as StudentFormValues['educationLevel'] })}>
          <Option value="o_level">O-Level</Option>
          <Option value="a_level">A-Level</Option>
        </Select>
        <Input label="Combination (A-Level)" value={values.combination} onChange={(e) => update({ combination: e.target.value })} placeholder="e.g. PCM" helper="Optional for O-Level students." />
      </div>

      <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-100 pt-4">
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>Cancel</Button>}
        <Button type="submit" variant="primary" isLoading={busy}>{submitLabel}</Button>
      </div>
    </form>
  );
}
