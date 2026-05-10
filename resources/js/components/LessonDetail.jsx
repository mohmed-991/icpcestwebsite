import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      if (response.data.success) {
        setLesson(response.data.data);
      }
    } catch (err) {
      setError('فشل في تحميل تفاصيل الدرس');
      console.error('Error fetching lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الدرس...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'الدرس غير موجود'}
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 800) return 'bg-green-100 text-green-800';
    if (difficulty <= 1200) return 'bg-yellow-100 text-yellow-800';
    if (difficulty <= 1600) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 800) return 'سهل';
    if (difficulty <= 1200) return 'متوسط';
    if (difficulty <= 1600) return 'صعب';
    return 'صعب جداً';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            <p className="text-gray-600 mt-2">{lesson.description}</p>
          </div>
          <span className="bg-green-100 text-green-800 text-lg font-medium px-4 py-2 rounded">
            {lesson.xp_reward} XP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">المستوى</div>
            <div className="text-xl font-bold text-gray-900">{lesson.level?.name}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">عدد المسائل</div>
            <div className="text-xl font-bold text-gray-900">{lesson.problems?.length || 0}</div>
          </div>
        </div>

        <div className="flex space-x-4 space-x-reverse mt-4">
          {lesson.video_url && (
            <a
              href={lesson.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              📹 مشاهده الفيديو
            </a>
          )}
          {lesson.handout_url && (
            <a
              href={lesson.handout_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              📄 تحميل المحاضرة
            </a>
          )}
        </div>
      </div>

      {/* Problems */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الأسئلة البرمجية</h2>

        {lesson.problems && lesson.problems.length > 0 ? (
          <div className="space-y-4">
            {lesson.problems.map((problem) => (
              <div key={problem.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <h3 className="text-xl font-semibold text-gray-900">{problem.name}</h3>
                      <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${getDifficultyColor(problem.difficulty)}`}>
                        {getDifficultyLabel(problem.difficulty)} ({problem.difficulty})
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-500">نقاط الخبرة</div>
                      <div className="text-lg font-bold text-green-600">{problem.xp_reward} XP</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <span className="text-sm text-gray-600">Codeforces ID: {problem.codeforces_id}</span>
                  </div>

                  <div className="flex space-x-2 space-x-reverse">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                      🔗 عرض المسألة
                    </a>
                    <Link
                      to={`/problems/${problem.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                      💻 حل المسألة
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">❓</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد مسائل متاحة</h3>
            <p className="text-gray-600">سيتم إضافة مسائل لهذا الدرس قريباً</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to={`/levels/${lesson.level_id}`}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          العودة للمستوى
        </Link>
        <Link
          to="/levels"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          جميع المستويات
        </Link>
      </div>
    </div>
  );
};

export default LessonDetail;