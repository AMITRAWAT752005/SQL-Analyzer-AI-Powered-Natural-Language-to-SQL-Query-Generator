import React, { useMemo, useState } from 'react';
import { useDatabase } from '../../hooks/useDatabase';
import { queryService, QueryResult } from '../../services/query.service';
import { historyService } from '../../services/history.service';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ResultTable } from '../../components/common/ResultTable';
import { Database as DatabaseIcon, Code2, Rocket, ScrollText, LayoutList, ShieldCheck } from 'lucide-react';

const SQLPlayground: React.FC = () => {
  const { activeConnection } = useDatabase();
  const [sql, setSql] = useState('SELECT * FROM students LIMIT 10;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastExecutionTime, setLastExecutionTime] = useState<number | null>(null);

  const activeSchema = useMemo(() => activeConnection?.schema || [], [activeConnection]);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);

    if (!activeConnection) {
      setError('Please connect to a database before executing queries.');
      setIsExecuting(false);
      return;
    }

    try {
      const res = await queryService.executeQuery(sql, activeConnection.database);
      setResult(res);
      setLastExecutionTime(res.executionTime);
      historyService.addHistoryItem(
        activeConnection.database,
        activeConnection.type,
        sql,
        sql,
        'Executed raw SQL in playground',
        res.executionTime
      );
    } catch (err: any) {
      setError(err?.message || 'Query execution failed.');
      setResult(null);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>SQL Playground</p>
          <h1 style={{ margin: '8px 0 0', fontSize: '2.25rem', fontWeight: 800 }}>Run queries against your active schema</h1>
          <p style={{ margin: '12px 0 0', maxWidth: '680px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Execute read-only SQL statements against mock database schemas, inspect results, and preserve executions in your history.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Badge variant={activeConnection ? 'success' : 'warning'}>
            {activeConnection ? 'Connected to ' + activeConnection.name : 'No active connection'}
          </Badge>
          <Button variant="secondary" size="md" disabled={!activeConnection}>
            <DatabaseIcon size={16} /> {activeConnection ? activeConnection.type.toUpperCase() : 'Unavailable'}
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '22px' }}>
        <Card title="SQL Editor" subtitle="Enter a SELECT query and press execute to view results.">
          <form onSubmit={handleExecute} style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Read-only SELECT queries are supported.</p>
              {lastExecutionTime !== null && (
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Last run: {lastExecutionTime} ms
                </span>
              )}
            </div>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              style={{
                width: '100%',
                minHeight: '240px',
                resize: 'vertical',
                borderRadius: '18px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                lineHeight: 1.6
              }}
            />

            {error && (
              <div style={{ padding: '14px', borderRadius: '16px', background: 'var(--error-glow)', border: '1px solid var(--error)', color: 'var(--error)' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button type="submit" size="lg" variant="primary" isLoading={isExecuting} disabled={!activeConnection}>
                <Rocket size={16} /> Execute Query
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={() => setSql('SELECT * FROM students LIMIT 10;')}>
                <Code2 size={16} /> Load Sample
              </Button>
            </div>
          </form>

          {result && (
            <div style={{ marginTop: '18px', display: 'grid', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Result</p>
                  <p style={{ margin: '8px 0 0', fontWeight: 700 }}>{result.rowCount} rows</p>
                </div>
                <Badge variant="success">{result.database}</Badge>
              </div>
              <ResultTable result={result} />
            </div>
          )}
        </Card>

        <div style={{ display: 'grid', gap: '18px' }}>
          <Card title="Schema Reference" subtitle="Explore tables in the connected database.">
            {activeSchema.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>
                No schema available. Switch to a connected database to inspect tables.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '14px' }}>
                {activeSchema.map((table) => (
                  <div key={table.tableName} style={{ padding: '14px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{table.tableName}</h4>
                        <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>{table.columns.length} columns</p>
                      </div>
                      <Badge variant="secondary">Table</Badge>
                    </div>
                    <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
                      {table.columns.map((column) => (
                        <div key={column.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '0.87rem' }}>
                          <span>{column.name}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{column.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Playground Actions" subtitle="Helpful tools for query discovery.">
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LayoutList size={18} style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Use SELECT with LIMIT to keep result sets fast.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ScrollText size={18} style={{ color: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Add WHERE clauses to focus on the rows you need.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>This sandbox only executes safe, read-only queries.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'; children: React.ReactNode; style?: React.CSSProperties }> = ({ variant = 'secondary', children, style }) => {
  const background = variant === 'success'
    ? 'var(--success-glow)'
    : variant === 'warning'
      ? 'var(--warning-glow)'
      : variant === 'accent'
        ? 'var(--accent-glow)'
        : variant === 'primary'
          ? 'var(--primary-glow)'
          : 'var(--bg-tertiary)';

  const color = variant === 'success'
    ? 'var(--success)'
    : variant === 'warning'
      ? 'var(--warning)'
      : variant === 'accent'
        ? 'var(--accent)'
        : variant === 'primary'
          ? 'var(--primary)'
          : 'var(--text-secondary)';

  const border = variant === 'success'
    ? '1px solid var(--success)'
    : variant === 'warning'
      ? '1px solid var(--warning)'
      : variant === 'accent'
        ? '1px solid var(--accent)'
        : variant === 'primary'
          ? '1px solid var(--primary)'
          : '1px solid var(--border-color)';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, background, color, border, ...style }}>
      {children}
    </span>
  );
};

export default SQLPlayground;
// 
