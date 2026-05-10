import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const LevelDetail = () => {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLevel();
  }, [id]);

  const fetchLevel = async () => {
    try {
      const response = await axios.get(`/api/levels/${id}`);
      if (response.data.success) {
        setLevel(response.data.data);
      }
    } catch (err) {
      setError('فشل في تحميل تفاصيل المستوى');
      console.error('Error fetching level:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل المستوى...</p>
        </div>
      </div>
    );
  }

  if (error || !level) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'المستوى غير موجود'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{level.name}</h1>
            <p className="text-gray-600 mt-2">{level.description}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-lg font-medium px-4 py-2 rounded">
            المستوى {level.order}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">التقييم المطلوب</div>
            <div className="text-2xl font-bold text-gray-900">{level.min_rating} - {level.max_rating}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">نقاط الخبرة المطلوبة</div>
            <div className="text-2xl font-bold text-gray-900">{level.required_xp} XP</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">عدد الدروس</div>
            <div className="text-2xl font-bold text-gray-900">{level.lessons?.length || 0}</div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">الدروس</h2>

        {level.lessons && level.lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {level.lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {lesson.xp_reward} XP
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{lesson.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">الترتيب:</span>
                      <span className="font-medium">{lesson.order}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">عدد المسائل:</span>
                      <span className="font-medium">{lesson.problems?.length || 0}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 space-x-reverse">
                    {lesson.video_url && (
                      <a
                        href={lesson.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center"
                      >
                        مشاهده الفيديو
                      </a>
                    )}
                    {lesson.handout_url && (
                      <a
                        href={lesson.handout_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center"
                      >
                        تحميل المحاضرة
                      </a>
                    )}
                  </div>

                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 text-center block mt-3"
                  >
                    عرض المسائل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد دروس متاحة</h3>
            <p className="text-gray-600">سيتم إضافة دروس لهذا المستوى قريباً</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to="/levels"
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          العودة للمستويات
        </Link>
      </div>
    </div>
  );
};

export default LevelDetail;