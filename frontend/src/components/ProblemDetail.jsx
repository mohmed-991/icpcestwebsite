import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int main() {
    // اكتب حلك هنا

    return 0;
}`);
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [compiling, setCompiling] = useState(false);
  const [compileResult, setCompileResult] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`/api/problems/${id}`);
      if (response.data.success) {
        setProblem(response.data.data);
      }
    } catch (err) {
      setError('فشل في تحميل تفاصيل المسألة');
      console.error('Error fetching problem:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompile = async () => {
    if (!code.trim()) {
      alert('يرجى كتابة الكود أولاً');
      return;
    }

    setCompiling(true);
    setCompileResult(null);

    try {
      const response = await axios.post('/api/compile', {
        code,
        language,
        input
      });

      setCompileResult(response.data);
    } catch (err) {
      setCompileResult({
        success: false,
        error: 'فشل في تشغيل الكود',
        details: err.message
      });
    } finally {
      setCompiling(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل المسألة...</p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'المسألة غير موجودة'}
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
      {/* Problem Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{problem.name}</h1>
            <div className="flex items-center space-x-4 space-x-reverse mt-2">
              <span className="text-gray-600">Codeforces ID: {problem.codeforces_id}</span>
              <span className={`text-sm font-medium px-3 py-1 rounded ${getDifficultyColor(problem.difficulty)}`}>
                {getDifficultyLabel(problem.difficulty)} ({problem.difficulty})
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                {problem.xp_reward} XP
              </span>
            </div>
          </div>
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            🔗 عرض على Codeforces
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">المستوى</div>
            <div className="text-lg font-bold text-gray-900">{problem.lesson?.level?.name}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">الدرس</div>
            <div className="text-lg font-bold text-gray-900">{problem.lesson?.title}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">نقاط الخبرة</div>
            <div className="text-lg font-bold text-green-600">{problem.xp_reward} XP</div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Input */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">المحرر</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اللغة البرمجية
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الكود
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اكتب كودك هنا..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المدخلات (اختياري)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="أدخل المدخلات للاختبار..."
            />
          </div>

          <button
            onClick={handleCompile}
            disabled={compiling}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            {compiling ? 'جاري التشغيل...' : '🚀 تشغيل الكود'}
          </button>
        </div>

        {/* Output */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">النتيجة</h2>

          {compiling && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">جاري تشغيل الكود...</p>
            </div>
          )}

          {compileResult && !compiling && (
            <div className="space-y-4">
              <div className={`p-4 rounded-md ${compileResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={compileResult.success ? 'text-green-600' : 'text-red-600'}>
                    {compileResult.success ? '✅' : '❌'}
                  </span>
                  <span className={`font-medium ${compileResult.success ? 'text-green-800' : 'text-red-800'}`}>
                    {compileResult.success ? 'تم التشغيل بنجاح' : 'خطأ في التشغيل'}
                  </span>
                </div>
              </div>

              {compileResult.output && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">المخرجات:</h3>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-x-auto">
                    {compileResult.output}
                  </pre>
                </div>
              )}

              {compileResult.error && (
                <div>
                  <h3 className="font-medium text-red-800 mb-2">الأخطاء:</h3>
                  <pre className="bg-red-50 p-3 rounded-md text-sm font-mono text-red-700 overflow-x-auto">
                    {compileResult.error}
                  </pre>
                </div>
              )}

              {compileResult.execution_time && (
                <div className="text-sm text-gray-600">
                  وقت التنفيذ: {compileResult.execution_time}ms
                </div>
              )}
            </div>
          )}

          {!compileResult && !compiling && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">💻</div>
              <p>اكتب كودك وقم بتشغيله لرؤية النتيجة</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Link
          to={`/lessons/${problem.lesson_id}`}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          العودة للدرس
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

export default ProblemDetail;