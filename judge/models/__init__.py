from reversion import revisions

from judge.models.choices import TIMEZONE, ACE_THEMES, MATH_ENGINES_CHOICES, EFFECTIVE_MATH_ENGINES
from judge.models.comment import Comment, CommentVote
from judge.models.contest import Contest, ContestTag, ContestParticipation, ContestProblem, ContestSubmission, Rating
from judge.models.interface import MiscConfig, validate_regex, NavigationBar, BlogPost
from judge.models.message import PrivateMessage, PrivateMessageThread
from judge.models.problem import ProblemGroup, ProblemType, Problem, ProblemClarification, ProblemTranslation, \
    TranslatedProblemQuerySet, TranslatedProblemForeignKeyQuerySet, License, LanguageLimit, Solution
from judge.models.problem_data import problem_data_storage, problem_directory_file, ProblemData, ProblemTestCase, \
    CHECKERS
from judge.models.profile import Profile, Organization, OrganizationRequest
from judge.models.runtime import Language, RuntimeVersion, Judge
from judge.models.submission import SUBMISSION_RESULT, Submission, SubmissionTestCase
from judge.models.ticket import Ticket, TicketMessage
from judge.models.notification import Notification

revisions.register(Profile, exclude=['points', 'last_access', 'ip', 'rating'])
revisions.register(Problem, follow=['language_limits'])
revisions.register(LanguageLimit)
revisions.register(Contest, follow=['contest_problems'])
revisions.register(ContestProblem)
revisions.register(Organization)
revisions.register(BlogPost)
revisions.register(Solution)
revisions.register(Judge, fields=['name', 'created', 'auth_key', 'description'])
revisions.register(Language)
revisions.register(Comment, fields=['author', 'time', 'page', 'score', 'title', 'body', 'hidden', 'parent'])
revisions.register(Notification)
del revisions
