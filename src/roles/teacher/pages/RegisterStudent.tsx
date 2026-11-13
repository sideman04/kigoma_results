/**
 * Teacher — Register Student.
 * Creates a student record scoped to the teacher's school. This form is for
 * learner registration only; it does not create teacher or officer accounts.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StudentForm, type StudentFormValues } from '../components/StudentForm';
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '../../shared/components/ui';
import { studentService } from '../../shared/services/api';
import { resolveTeacherSchoolId, resolveTeacherSchoolName } from '../utils/scope';
import { CheckCircle, Info, UserPlus } from 'lucide-react';

export default function RegisterStudent() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [admissionNumbers, setAdmissionNumbers] = useState<string[]>([]);
  const [registrationNumbers, setRegistrationNumbers] = useState<string[]>([]);

  const schoolId = resolveTeacherSchoolId(user);
  const schoolName = resolveTeacherSchoolName(user);

  useEffect(() => {
    studentService.list({ pageSize: 500, scope: { role: 'teacher', schoolId } }).then((res) => {
      const students = res.data.filter((student) => student.schoolId === schoolId);
      setAdmissionNumbers(students.map((student) => (student.admissionNo ?? '').toLowerCase()).filter(Boolean));
      setRegistrationNumbers(students.map((student) => (student.regNo ?? '').toLowerCase()).filter(Boolean));
    }).catch(() => {});
  }, [schoolId]);

  const handleSubmit = async (values: StudentFormValues & { className?: string; streamName?: string }) => {
    if (admissionNumbers.includes(values.admissionNo.toLowerCase())) {
      toast({ title: 'Admission number already exists', description: 'Use a unique admission number for this school.', variant: 'destructive' });
      return;
    }
    if (values.regNo && registrationNumbers.includes(values.regNo.toLowerCase())) {
      toast({ title: 'Registration number already exists', description: 'That registration number is already assigned to another student.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const created = await studentService.create({
        name: values.name,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        admissionNo: values.admissionNo,
        regNo: values.regNo,
        schoolId,
        schoolName,
        classId: values.classId,
        className: values.className,
        streamId: values.streamId || undefined,
        streamName: values.streamName,
        educationLevel: values.educationLevel,
        combination: values.combination || undefined,
        status: values.status,
      });
      toast({ title: 'Student registered', description: `${created.name} has been added to the school register.`, variant: 'success' });
      navigate(`/teacher/student-details?id=${created.id}`);
    } catch (err) {
      toast({ title: 'Unable to register student', description: err instanceof Error ? err.message : 'Try again.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Register Student"
        description={`Add a new learner to ${schoolName}. Personal and academic details can be updated later.`}
        action={<Button variant="ghost" size="sm" onClick={() => navigate('/teacher/students')}>View student directory</Button>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Student registration form</CardTitle>
            <p className="text-xs text-neutral-500">Fields marked with an asterisk are required.</p>
          </CardHeader>
          <CardContent className="pt-0">
            <StudentForm submitLabel="Register student" busy={saving} onSubmit={handleSubmit} onCancel={() => navigate('/teacher/students')} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Registration checklist</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-3 text-sm text-neutral-600">
              <ChecklistItem text="Confirm the learner’s name matches official records." />
              <ChecklistItem text="Use a unique admission number for this school." />
              <ChecklistItem text="Assign the correct class and stream." />
              <ChecklistItem text="Add a NECTA registration number when available." />
              <ChecklistItem text="Verify the enrolment status before saving." />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">School-scoped record</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    This student will be registered under <span className="font-medium text-neutral-700">{schoolName}</span>. Teachers cannot register learners for other schools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-green-100 bg-green-50 p-4">
            <div className="flex items-center gap-2 text-green-800">
              <UserPlus className="h-4 w-4" />
              <p className="text-sm font-semibold">Student management only</p>
            </div>
            <p className="mt-1 text-xs text-green-800/80">
              Teacher accounts do not have access to examination marks entry, marks submission, marks approval or results management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
      <span>{text}</span>
    </div>
  );
}
